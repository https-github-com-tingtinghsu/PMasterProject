import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "ReplyChannel" }, {
  connected() {
    console.log("reply connect")
  },

  disconnected() {
  },

  received(data) {
    console.log(data)

    const replies = $('#post-id-' + data.postid + '-of-replies-counts')
    if(!replies) return

    $('#post-id-' + data.postid + '-of-replies-counts').text(data.replycount)
    const replieshave = $('#post-id-' + data.postid + '-of-replies-counts').hasClass('replies-counts')
    if (!replieshave){
      $('#post-id-' + data.postid + '-of-replies-counts').addClass('replies-counts');
    }
    const element = $('#replies-show-post-id-' + data.postid)
    if(!element) return 

    element.append("<div id='reply-id-" + data.postid + "' class='reply-created-block'>" +
    "<div class='reply-user-name'>" + data.username + "：</div>" +
    "<div class='reply-content'>" + data.replycontent + "</div></div>")
  }
});
