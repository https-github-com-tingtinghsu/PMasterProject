import consumer from "../../javascript/channels/consumer"


consumer.subscriptions.create({ channel: "ChartChannel"}, {
  connected() {
    // console.log('ChartChannel')
  },

  disconnected() {
  },

  received(data) {
    const element = document.querySelector('.subtitle')
    if(!element)return
    const group_id = element.getAttribute('data-group-id')
    if(!group_id)return
    if( group_id == data.groupid){
      window.location.reload();

      // let burn_element = document.getElementsByClassName('burn-chart-tab is-active')
      // let pie_element = document.getElementsByClassName('pie-chart-tab is-active')
      // let bar_element = document.getElementsByClassName('bar-chart-tab is-active')

      // if(burn_element.length > 0){
      //   $('.burn-chart-tab').on('click',() => {

      //   })
      // }
      // if(pie_element.length > 0){
      //   $('.pie-chart-tab').on('click',() => {
          
      //   })
      // }
    }
  }
});
