import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create("LikeChannel", {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
    // Called when the subscription has been terminated by the server
  },

  received(data) {
    const element = document.querySelector('#post-id-' + data.postid + '-be-liked-counts')
    if(!element)return

    if(data.countlike > 0){
      element.textContent = data.countlike + " 人說讚"
    }
    else{
      element.textContent = ""
    }
  }
});
