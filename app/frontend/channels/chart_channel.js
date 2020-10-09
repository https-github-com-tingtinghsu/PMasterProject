import consumer from "../../javascript/channels/consumer"


consumer.subscriptions.create({ channel: "ChartChannel"}, {
  connected() {
    console.log('ChartChannel')
  },

  disconnected() {
  },

  received(data) {
    console.log(data)
    const element = document.querySelector('.subtitle')
    if(!element)return
    const group_id = element.getAttribute('data-group-id')
    if(!group_id)return
    if( group_id == data.groupid){
      window.location.reload();
    }
    console.log('group_id : ' + group_id + ' data.group_id : ' + data.groupid)
  }
});
