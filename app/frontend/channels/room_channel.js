import consumer from "./consumer"

const currentRoomIds = {}
// console.log(currentRoomIds)
document.addEventListener('turbolinks:load', () => {
  
  const element = document.querySelector('.chatcontent-box')
    if(!element)return
  const room_id = element.getAttribute('data-room-id')
  const userEmail = element.getAttribute('data-user')
  const userId = element.getAttribute('data-user-id')
  // console.log(userId)
  // const test = document.querySelector('.who-online')
  // const eleOnline = document.querySelector(".online-user")

  
  if (currentRoomIds[room_id]) return;

  consumer.subscriptions.create( { channel: "RoomChannel", room_id: room_id, user_email: userEmail, user_id: userId}, {
    // 當進入聊天室，即為開始訂閱該RoomChannel，並把參數帶進去(room_id: room_id, user_email: userEmail, user_id: userId)
    connected() {
      // console.log("連接" + room_id)
      currentRoomIds[room_id] = true
      // console.log(currentRoomIds[room_id])
      // Called when the subscription is ready for use on the server
      // console.log(eleOnline.textContent.slice(0,-11).trim())
    },
  
    disconnected() {
      delete currentRoomIds[room_id]
      // Called when the subscription has been terminated by the server
    },
  
    received(data) {
      const element = document.getElementById('user-id');
      const user_id = (Number)(element.getAttribute('data-user-id'));
      const user_name = element.getAttribute('data-user-name');
      const messageContainer = document.getElementById('messages');
      const scroll_controller = document.querySelector('.chatroom-group');
      const $messages = document.querySelector('#messages');
      const message_input = document.querySelector('.text-input');
      const board_title = (document.querySelector('.main-dashboard')).getAttribute('data-board-name');
      // const user_id = element.getAttribute('data-user-id');
      
      if (user_id === data.message.user_id){
        messageContainer.innerHTML += data.me;
        message_input.value = '';
      }else{
        messageContainer.innerHTML += data.others
      }
      // scroll_controller.scrollTop = scroll_controller.scrollHeight;
      $messages.scrollTo(0, $messages.scrollHeight);
      // console.log(data)
      // 2020/09/27 Wei
      // Notification 
      // 提醒目前設計是學 Line
      if(Notification.permission === "granted"){
        var title = user_name + "【 " + board_title + " 】"
        var body  = data.message.content
        var options = { body: body, icon: 'https://i.imgur.com/WucFGxW.png'}
        new Notification(title, options)
      }

      // scroll_controller.addEventListener('keydwn', function(e){
      //   if( e.keyCode === 13){
      //     forInput();
      //   }
      // },false)
      
      
    }
  });
})

