document.addEventListener('turbolinks:load', () => {

  $('select').change(function(e){ 
    let id = e.target.id
    var status = $(this).find(":selected").text();
    $.ajax({ 
    url: "/item/groupupdate", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "PATCH", 
    data: {
      "id": id,
      "status": status
    }, 
    success: () =>{
       console.log('完成')
    }
    }) 
  }); 


  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);

  if ($navbarBurgers.length > 0) {
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);

        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');

      });
    });
  }
  // Get edit_count && sing_out_button toggle the "is-active"
  const buttonDiv = document.querySelector('.sign-in-buttons')
  const arrow_button = document.querySelector('.arrow_icon')
  arrow_button.addEventListener('click', function(){
    arrow_button.classList.toggle('arrow')
    buttonDiv.classList.toggle('sign-in-buttons-open')
    // console.log('aaa')
  })


  //Get chatroom toggle the "is-active"
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

  

  //Get edit_task toggle the "is-active"
  const taskTables = document.querySelectorAll('.table')
  //先抓出所有的table
  // const editArrow = document.querySelector('.fa-caret-right')
  
  function toggleTaskName(e){
    taskArrowClass = Array.from(e.target.classList)
    //e.target.classList抓出來是物件，轉成陣列好取到我們要的節點
    if(taskArrowClass.indexOf("fa-caret-right") !== -1){
      //如果fa-caret-right是有的，就執行以下程式
      e.target.classList.toggle("arrow")
      //箭頭動畫
      // e.target.parentNode.parentNode.querySelector(".edit-delete-task").classList.toggle("edit-delete-task-open")
      //編輯icon開盒
      e.target.parentNode.parentNode.querySelector(".item-name").classList.toggle("item-name-right")
    }
  }

  taskTables.forEach((table)=>{
    table.addEventListener("click", toggleTaskName)
  })
  //使用forEach將全部的table進行監聽（點擊事件）
  console.log(taskTables)
  
});