import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create( { channel: "PostChannel" }, {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    const element = document.querySelector('#post-id-' + data.postid + '-be-liked-counts')
    console.log(element)
    if(!element)return

    if(data.countlike > 0){
      element.textContent = data.countlike + " 人說讚"
    }
    else{
      element.textContent = ""
    }
  }
});
