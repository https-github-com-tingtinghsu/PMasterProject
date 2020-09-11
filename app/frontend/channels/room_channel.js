import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const scroll_controller = document.querySelector('.chatcontent-box');
  const element = document.querySelector('.chatcontent-box')
  // if(element === null)
    if(!element)return
  const room_id = element.getAttribute('data-room-id')
  scroll_controller.scrollTop = scroll_controller.scrollHeight;

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
      const messageContainer = document.getElementById('messages');
      const scroll_controller = document.querySelector('.chatcontent-box');
      const message_input = document.querySelector('.text-input');
      // const user_id = element.getAttribute('data-user-id');
      // console.log(element)
      // console.log(user_id)
      // debug
      
      if (user_id === data.message.user_id){
        messageContainer.innerHTML += data.me;
      }else{
        messageContainer.innerHTML += data.others
      }
      scroll_controller.scrollTop = scroll_controller.scrollHeight;
      message_input.value = '';
      console.log(message_input.value)

      scroll_controller.addEventListener('keydwn', function(e){
        if( e.keyCode === 13){
          forInput();
        }
      },false)
      
      // console.log(typeof data.message.user_id)
      // console.log(typeof user_id)
      // console.log(html)
    }
  });
// }
})

