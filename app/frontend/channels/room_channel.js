import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const element = document.querySelector('.chatcontent-box')
  const room_id = element.getAttribute('data-room-id')
  // console.log(element)
  console.log(room_id)
  // console.log(room_id)
  consumer.subscriptions.create( { channel: "RoomChannel", room_id: room_id }, {
    connected() {
      console.log("連接" + room_id)
      // Called when the subscription is ready for use on the server
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      console.log(data)
      const element = document.getElementById('user-id');
      const user_id = (Number)(element.getAttribute('data-user-id'));
      const messageContainer = document.getElementById('messages')
      // const user_id = element.getAttribute('data-user-id');
      // console.log(element)
      // console.log(user_id)
      // debug
      
      if (user_id === data.message.user_id){
        messageContainer.innerHTML += data.me
      }else{
        messageContainer.innerHTML += data.others
      }

      // console.log(typeof data.message.user_id)
      // console.log(typeof user_id)
      // console.log(html)
      
    }
  });
})

