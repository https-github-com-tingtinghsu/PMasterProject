import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "ItemChannel" }, {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
  },

  received(data) {
    console.log(data)
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
   
    const itemelement = $('#have-item-' + data.itemid)
    const itemClone = $('#have-item-' + data.itemid).clone()
    if(!itemelement) return
    // my task add item
    switch(data.itemstatus){
      case "待修改":
        $('.ul-status-pending').append(itemClone)
        break;
      case "進行中":
        $('.ul-status-working').append(itemClone)
        break;
      case "卡關中":
        $('.ul-status-stuck').append(itemClone)
        break;
      case "已完成":
        $('.ul-status-done').append(itemClone)
        break;
      default:
        break;
    }
    // my task remove item
    itemelement.remove()
  }
});
