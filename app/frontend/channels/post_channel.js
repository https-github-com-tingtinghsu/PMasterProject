import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create( { channel: "PostChannel" }, {
  connected() {
    console.log(" post connect")
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    // Called when there's incoming data on the websocket for this channel
    console.log(data)

    // post-id-18-be-liked-counts
    const element = document.querySelector('#post-id-' + data.postid + '-be-liked-counts')
    console.log(element)
    if(!element)return
    element.textContent = data.countlike;
  }
});
