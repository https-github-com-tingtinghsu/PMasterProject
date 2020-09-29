import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create("LikeChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    console.log(data)

    // post-id-18-be-liked-counts
    const element = document.querySelector('#post-id-18-be-liked-counts')
    console.log(element)
    if(!element)return
    element.textContent = "100";
  }
});
