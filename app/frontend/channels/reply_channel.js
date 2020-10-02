import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "ReplyChannel" }, {
  connected() {
    console.log("reply connect")
  },

  disconnected() {
  },

  received(data) {
    console.log(data)
    $('#post-id-' + data.postid + '-of-replies-counts').text(data.replycount)
  }
});
