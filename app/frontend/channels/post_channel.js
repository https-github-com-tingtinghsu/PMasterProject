import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create( { channel: "PostChannel" }, {
  connected() {
  },

  disconnected() {
  },

  received(data) {
    if(!$('#item-id-' + data.itemid + '-of-posts-counts').hasClass('posts-counts')){
      $('#item-id-' + data.itemid + '-of-posts-counts').addClass('posts-counts')
    }
    $('#item-id-' + data.itemid + '-of-posts-counts').text(data.post_count)
    
    // $('#post-icon-id-'+ data.itemid)[0].click();

    const element = document.querySelector('.posts-header')
    // console.log("element : "+ element)
    if(!element) return
    
    const item_id = element.getAttribute('data-item-id')
    console.log("item_id : " + item_id )
    if(!item_id) return

    console.log("item_id == data.itemid : " + item_id + " , " + data.itemid)
    if(item_id == data.itemid){
      $('#post-icon-id-'+ data.itemid)[0].click();
    }
  }
});
