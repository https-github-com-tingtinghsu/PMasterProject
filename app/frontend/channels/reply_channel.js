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
  //   const element = document.getElementById('replies-show-post-id-' + data.postid)
  //   if(!element) return 

  //   element.prepend("<div id='reply-id-" + data.postid + "' class='reply-created-block'>" +
  //   "<div class='reply-user-name'>" + " userNN "+ "：</div>" +
  //   "<div class='reply-content'>" + "內容" + "</div></div>")
  // }
    // class="replies-counts" 

//     <% if (post.replies.count > 0) %>
//     <span class="replies-counts" id="post-id-<%= @post.id %>-of-replies-counts" ><%= @post.replies.count %></span>
// <% else %>
//     <span id="post-id-<%= @post.id %>-of-replies-counts" ></span>
// <% end %>
  }
});
