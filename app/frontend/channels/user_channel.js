import consumer from "../../javascript/channels/consumer"

document.addEventListener('turbolinks:load', () => {

  const element = document.querySelector('.hello-user')
  if(!element)return
  const userId = element.getAttribute('data-user-id')
  console.log(userId)
  
  consumer.subscriptions.create( {channel: "UserChannel", user_id: userId}, {
      connected() {
        console.log('user connection')
      },

      disconnected() {
        console.log('user disconnection')
      },

      received(data) {
        console.log("===============")
        console.log(data)
        if(Notification.permission === "granted"){
          var title = "Issues 通知"
          var body  = data
          var options = { body: body}
          new Notification(title, options)
        }
      }
    });
})
