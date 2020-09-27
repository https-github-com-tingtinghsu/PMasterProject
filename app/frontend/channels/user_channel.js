import consumer from "../../javascript/channels/consumer"

document.addEventListener('turbolinks:load', () => {

  const element = document.querySelector('.hello-user')
  if(!element)return
  const userId = element.getAttribute('data-user-id')
  
consumer.subscriptions.create( {channel: "UserChannel", user_id: userId}, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
    }
  });
})
