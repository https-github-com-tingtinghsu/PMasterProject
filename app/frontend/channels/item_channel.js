import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "ItemChannel" }, {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
  },

  received(data) {
    if(data.itemstatus != undefined){
      $('#' + data.itemid).val(data.itemstatus)
      if(data.itemstatus == "已完成"){
        console.log($('.item-point')[0 + 1])
        console.log($('.item-point').val())
        $('.item-point').val("ha")
      }
    }
    // 
    if(data.itemsname != undefined){
      $('#item-name-' + data.itemid).val(data.itemsname)
    }
    //
    if(data.itemsdescription != undefined){
      $('#item-description-' + data.itemid).val(data.itemsdescription)
    }
  }
});
