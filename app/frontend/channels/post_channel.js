import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create( { channel: "PostChannel" }, {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    if(data == "123"){
        $.ajax({
          url: "/items/100/posts",
          method: "POST",
          data: {
              "refresh": "refresh"
          },
          error:function(){
            console.log("失敗")
          },
          success:function(){
              console.log("成功")
          } 
      });
    }
    // const element = document.querySelector('#post-id-' + data.postid + '-be-liked-counts')
    // if(!element)return

    // if(data.countlike > 0){
    //   element.textContent = data.countlike + " 人說讚"
    // }
    // else{
    //   element.textContent = ""
    // }
  }
});
