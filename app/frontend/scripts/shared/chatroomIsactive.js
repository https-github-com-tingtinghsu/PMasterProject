document.addEventListener('turbolinks:load', () => {	  //Get chatroom toggle the "is-active"
  const clickDiv = document.querySelector('.chatroom-lebal')
  const chatroomContent = document.querySelector('.chatcontent-box')
  const chatroomInput = document.querySelector('.chatroom-input')
  if(!clickDiv)return
  clickDiv.addEventListener('click',function(){
    chatroomContent.classList.toggle('open')
    chatroomContent.classList.toggle('chatroom-group')
    clickDiv.classList.toggle('rotate')
    chatroomInput.classList.toggle('appear')
    const $messages = document.querySelector('#messages');
    $messages.scrollTo(0, $messages.scrollHeight);
  })
  
  const messages_scroll = document.querySelector('#messages');
  messages_scroll.addEventListener('scroll', function(){
    if(messages_scroll.scrollTop == 0){
      document.querySelector('#prev-messages a').click();
      //不能使用變數替代
    }
  })

  //move_chatroom from post_icon
  const postIconDiv = document.querySelectorAll('.post-icon-and-counts')
  const chatRoomDiv = document.querySelector('.chatroombox')
  const postsCloseBtn = document.querySelectorAll('.post-close')
  postIconDiv.forEach((postIcon) => {
    postIcon.addEventListener('click', () => {
      chatRoomDiv.classList.add('chatroombox-move')
    })
  })
});