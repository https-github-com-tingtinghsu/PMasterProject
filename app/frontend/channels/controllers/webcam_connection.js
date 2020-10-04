// import { Controller } from "stimulus"

// export default class extends Controller {
//     static targets = [ "main", "remote" ]

//     constructor(props) {
//         super(props)
//         this.connection = new Connection
//         this.connection.remoteStreamTarget = this.remoteTarget
//         this.channel = createChannel("WebcamChannel", this.connection)
//       }

//     hasGetUserMedia(){
//         return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
//             navigator.mozGetUserMedia || navigator.msGetUserMedia);
//     }

//     getUserMedia() {
//         if (hasGetUserMedia()) {
//             console.log('got it!');
            
//             // media start
//             var player = document.getElementById('player'); 
//             var snapshotCanvas = document.getElementById('snapshot');
//             var captureButton = document.getElementById('capture');
//             var statusButton = document.getElementById('status');
//             var videoTracks;

//             var handleSuccess = function(stream) {
//                 player.srcObject = stream;
//                 videoTracks = stream.getVideoTracks();
//             };

//             captureButton.addEventListener('click', function() {
//                 var context = snapshot.getContext('2d');
                
//                 context.drawImage(player, 0, 0, snapshotCanvas.width, 
//                     snapshotCanvas.height);                
//             });

//             // add stop Event 
//             statusButton.addEventListener('click', () =>{
//                 if( statusButton.textContent == "停止"){
//                     statusButton.textContent = "開始";
//                     // Stop all video streams.
//                     videoTracks.forEach(function(track) {track.stop()});
//                 }
//                 else{
//                     // statusButton.textContent = "停止";
//                     // navigator.mediaDevices.getUserMedia({video: true, audio: true})
//                     //     .then(handleSuccess);

//                     statusButton.textContent = "停止";
//                     navigator.mediaDevices.getUserMedia({
//                         audio: false,
//                         video: true
//                     }).then((stream) => {
//                         this.connection.localStream = stream
//                         // this.mainTarget.srcObject = stream
//                         // this.channel.send({type: "TOKEN"})
//                     })
//                 }
//             })
//         } else {
//             alert('getUserMedia() is not supported in your browser')};


            

//         navigator.mediaDevices.getUserMedia({
//             audio: false,
//             video: true
//         }).then((stream) => {
//             this.connection.localStream = stream
//             // this.mainTarget.srcObject = stream
//             // this.channel.send({type: "TOKEN"})
//         })
//     }
// }

  