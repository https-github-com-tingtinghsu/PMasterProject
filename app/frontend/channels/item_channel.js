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
        const d = new Date(Date.now())
        $('.item-finsih-date-' + data.itemid).text( d.getFullYear() + "-" + (d.getMonth() +1) + "-" + d.getDate() )
      }
      else{
        $('.item-finsih-date-' + data.itemid).text('')
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
