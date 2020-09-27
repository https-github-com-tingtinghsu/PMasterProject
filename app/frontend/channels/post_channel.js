import consumer from "../../javascript/channels/consumer"

document.addEventListener('turbolinks:load', () => {

  // like switch
  const element = document.querySelector('.post-id')
  console.log(element)
  if(!element)return

  consumer.subscriptions.create( { channel: "PostChannel", post_id: 19}, {
    connected() {
      console.log(' Post WebSocket Connection')
    },

    disconnected() {
      // Called when the subscription has been terminated by the server
    },

    received(data) {
      // Called when there's incoming data on the websocket for this channel

      const post_id = (Number)(element.getAttribute('post_id'));
      console.log(post_id)
    }
  });
})