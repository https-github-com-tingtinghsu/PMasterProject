import consumer from "../../javascript/channels/consumer"

// document.addEventListener('turbolinks:load', () => {

//   const element = document.querySelector('.local-video')
//     if(!element)return
  
// Broadcast Types
const JOIN_ROOM = "JOIN_ROOM";
const EXCHANGE = "EXCHANGE";
const REMOVE_USER = "REMOVE_USER";

// DOM Elements
let currentUser;
let localVideo;
let remoteVideoContainer;

// Objects
let pcPeers = {};
var localstream;

window.onload = () => {
  currentUser = document.getElementById("current-user").innerHTML;
  localVideo = document.getElementById("local-video");
  remoteVideoContainer = document.getElementById("remote-video-container");
};

// Ice Credentials
const ice = { iceServers: [{ urls: "stun:stun.l.google.com:19302" }] };

document.addEventListener("DOMContentLoaded", () => {
  const joinButton = document.getElementById("join-button");
  const leaveButton = document.getElementById("leave-button");

  joinButton.onclick = handleJoinSession;
  leaveButton.onclick = handleLeaveSession;
});

// Initialize user's own video
document.onreadystatechange = () => {
  console.log("ReadyState : " + document.readyState)

  const element = document.querySelector('.local-video')
  console.log("find video : " + element)
  if(!element)return
  if (document.readyState === "interactive") {
    // navigator.mediaDevices
    //   .getUserMedia({
    //     audio: true,
    //     video: true,
    //   })
    //   .then((stream) => {
    //     console.log(stream)
    //     localstream = stream;
    //     localVideo.srcObject = stream;
    //     localVideo.muted = true;
    //   })
    //   .catch(logError);

    navigator.mediaDevices.getDisplayMedia({
            video: {
              cursor: "always"
            },
            audio: true
    }).then((stream) => {
        localstream = stream;
        localVideo.srcObject = stream;
        localVideo.muted = true;
    }).catch(logError)
  }
};

const handleJoinSession = async () => {
  consumer.subscriptions.create({ channel: "WebcamChannel" }, {
    connected: () => {
      broadcastData({
        type: JOIN_ROOM,
        from: currentUser,
      });
    },
    received: (data) => {
      console.log("received", data);
      console.log("==================")
      if (data.from === currentUser) return;
      switch (data.type) {
      case JOIN_ROOM:
        console.log("JOIN_ROOM : ", data)
        console.log("==================")
        return joinRoom(data);
      case EXCHANGE:
        console.log("EXCHANGE : ", data)
        console.log("==================")
        if (data.to !== currentUser) return;
        return exchange(data);
      case REMOVE_USER:
        console.log("REMOVE_USER : ", data)
        console.log("==================")
      default:
        return;
      }
    },
  });
};

const handleLeaveSession = () => {
  for (let user in pcPeers) {
    pcPeers[user].close();
  }
  pcPeers = {};

  remoteVideoContainer.innerHTML = "";

  broadcastData({
    type: REMOVE_USER,
    from: currentUser,
  });
};

const joinRoom = (data) => {
  createPC(data.from, true);
};

const removeUser = (data) => {
  console.log("removing user", data.from)
  console.log("==================")
  let video = document.getElementById(`remoteVideoContainer+${data.from}`);
  video && video.remove();
  delete pcPeers[data.from];
};

const createPC = (userId, isOffer) => {
  let pc = new RTCPeerConnection(ice);
  const element = document.createElement("video");
  element.id = `remoteVideoContainer+${userId}`;
  element.autoplay = "autoplay";
  remoteVideoContainer.appendChild(element);

  pcPeers[userId] = pc;
  console.log("localstream.getTracks()",localstream)
  console.log("==================")
  for (const track of localstream.getTracks()) {
    pc.addTrack(track, localstream);
  }

  isOffer &&
    pc
      .createOffer()
      .then((offer) => {
        return pc.setLocalDescription(offer);
      })
      .then(() => {
        broadcastData({
          type: EXCHANGE,
          from: currentUser,
          to: userId,
          sdp: JSON.stringify(pc.localDescription),
        });
      })
      .catch(logError);

  pc.onicecandidate = (event) => {
    event.candidate &&
      broadcastData({
        type: EXCHANGE,
        from: currentUser,
        to: userId,
        candidate: JSON.stringify(event.candidate),
      });
  };

  pc.ontrack = (event) => {
    if (event.streams && event.streams[0]) {
      element.srcObject = event.streams[0];
    } else {
      let inboundStream = new MediaStream(event.track);
      element.srcObject = inboundStream;
    }
  };

  pc.oniceconnectionstatechange = () => {
    if (pc.iceConnectionState == "disconnected") {
      console.log("Disconnected:", userId);
      console.log("==================")
      broadcastData({
        type: REMOVE_USER,
        from: userId,
      });
    }
  };

  return pc;
};

const exchange = (data) => {
  let pc;

  if (!pcPeers[data.from]) {
    pc = createPC(data.from, false);
  } else {
    pc = pcPeers[data.from];
  }

  if (data.candidate) {
    pc.addIceCandidate(new RTCIceCandidate(JSON.parse(data.candidate)))
      .then(() => console.log("Ice candidate added"))
      .catch(logError);
  }

  if (data.sdp) {
    const sdp = JSON.parse(data.sdp);
    pc.setRemoteDescription(new RTCSessionDescription(sdp))
      .then(() => {
        if (sdp.type === "offer") {
          pc.createAnswer()
            .then((answer) => {
              return pc.setLocalDescription(answer);
            })
            .then(() => {
              broadcastData({
                type: EXCHANGE,
                from: currentUser,
                to: data.from,
                sdp: JSON.stringify(pc.localDescription),
              });
            });
        }
      })
      .catch(logError);
  }
};

const broadcastData = (data) => {
  const csrfToken = document.querySelector("[name=csrf-token]").content;
  const headers = new Headers({
    "content-type": "application/json",
    "X-CSRF-TOKEN": csrfToken
  });

  fetch("webrtc", {
    method: "POST",
    body: JSON.stringify(data),
    headers
  }).catch((err) => {
    console.log('錯誤:', err);
  });
};

const logError = (error) => console.warn("Whoops! Error:", error);

// })

