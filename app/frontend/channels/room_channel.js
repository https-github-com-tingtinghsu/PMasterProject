import consumer from "./consumer"

document.addEventListener('turbolinks:load', () => {
  const element = document.querySelector('.chatcontent-box')
    if(!element)return
  const room_id = element.getAttribute('data-room-id')
  

  consumer.subscriptions.create( { channel: "RoomChannel", room_id: room_id }, {
    connected() {
      // console.log("連接" + room_id)
      // Called when the subscription is ready for use on the server
    },
  
    disconnected() {
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      console.log( data)
      const element = document.getElementById('user-id');
      const user_id = (Number)(element.getAttribute('data-user-id'));
      const messageContainer = document.getElementById('messages');
      const scroll_controller = document.querySelector('.chatroom-group');
      const $messages = document.querySelector('#messages');
      const message_input = document.querySelector('.text-input');
      // const user_id = element.getAttribute('data-user-id');
      
      if (user_id === data.message.user_id){
        messageContainer.innerHTML += data.me;
        message_input.value = '';
      }else{
        messageContainer.innerHTML += data.others
      }
      // scroll_controller.scrollTop = scroll_controller.scrollHeight;
      $messages.scrollTo(0, $messages.scrollHeight);

      // scroll_controller.addEventListener('keydwn', function(e){
      //   if( e.keyCode === 13){
      //     forInput();
      //   }
      // },false)
      
      
    }
  });
})

