document.addEventListener('turbolinks:load', () => {

  const statusOptions = document.querySelectorAll('.item-status-option')

  statusOptions.forEach( (option) => {
    if(option.querySelector('option:checked').value == "卡關中"){
      option.classList.add('red')
    }else if(option.querySelector('option:checked').value == "進行中"){
      option.classList.add('blue')
    }else if(option.querySelector('option:checked').value == "待修改"){
      option.classList.add('pink')
    }else if(option.querySelector('option:checked').value == "待指派"){
      option.classList.add('yellow')
    }else if(option.querySelector('option:checked').value == "已完成"){
      option.classList.add('gray')
    }
  })

  function changeBackgroundColorFinish(){
    statusOptions.forEach( (option) => {
      if(option.querySelector('option:checked').value == "卡關中"){
        option.classList.add('red')
      }else if(option.querySelector('option:checked').value == "進行中"){
        option.classList.add('blue')
      }else if(option.querySelector('option:checked').value == "待修改"){
        option.classList.add('pink')
      }else if(option.querySelector('option:checked').value == "待指派"){
        option.classList.add('yellow')
      }else if(option.querySelector('option:checked').value == "已完成"){
        option.classList.add('gray')
      }
  
    })
  }

  function changeBackgroundColor(e){
    let optionClass = Array.from(e.target.classList)
    if(optionClass.indexOf("item-status-option") !== -1){
      e.target.classList.remove(e.target.classList[1])
    }
    
  }

  statusOptions.forEach((option)=>{
    option.addEventListener('change',changeBackgroundColor)
  })

  $('.item-name').on("change", function(e){ 
    let id = document.querySelector('#' + e.target.id).getAttribute("data-item-id")
    var name = $(this).val();
    $.ajax({ 
    url: "/item/nameupdate", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "PATCH", 
    data: {
      "id": id,
      "name": name
    }, 
    success: () =>{
       console.log('完成')
       location.reload()
    }
    }) 
  }); 

  $('.item-description').on("change", function(e){ 
    let id = document.querySelector('#' + e.target.id).getAttribute("data-item-id")
    var description = $(this).val();
    $.ajax({ 
    url: "/item/descriptionupdate", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "PATCH", 
    data: {
      "id": id,
      "description": description
    }, 
    success: () =>{
       console.log('完成')
       location.reload()
    }
    }) 
  }); 
  


  $('select').change(function(e){ 
    let id = e.target.id
    var status = $(this).find(":selected").text();
    $.ajax({ 
    url: "/item/statusupdate", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "PATCH", 
    data: {
      "id": id,
      "status": status
    }, 
    success: () =>{
       console.log('完成')
       changeBackgroundColorFinish()
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
  const taskli = document.querySelectorAll('.items-task')
  //先抓出所有的table
  // const editArrow = document.querySelector('.fa-caret-right')
  
  function toggleTaskName(e){
    taskArrowClass = Array.from(e.target.classList)
    //e.target.classList抓出來是物件，轉成陣列好取到我們要的節點
    if(taskArrowClass.indexOf("fa-caret-right") !== -1){
      //如果fa-caret-right是有的，就執行以下程式
      e.target.classList.toggle("arrow")
      //箭頭動畫
      e.target.parentNode.parentNode.querySelector(".edit-delete-task").classList.toggle("edit-delete-task-open")
      //編輯icon開盒

    }
  }

  taskli.forEach((list)=>{
    list.addEventListener("click", toggleTaskName)
  })
  //使用forEach將全部的table進行監聽（點擊事件）
  // console.log(taskTables)

  //move_chatroom from post_icon
  const postIconDiv = document.querySelectorAll('.post-icon-and-counts')
  const chatRoomDiv = document.querySelector('.chatroombox')
  const postsCloseBtn = document.querySelectorAll('.post-close')
  postIconDiv.forEach((postIcon) => {
    postIcon.addEventListener('click', () => {
      chatRoomDiv.classList.add('chatroombox-move')
    })
  })
  
  const workspaceToggle = document.querySelector('.workspace-list-colse')
  const workspaceList = document.querySelector('.media-display-none')
  workspaceToggle.addEventListener('click', () => {
    workspaceToggle.classList.toggle('workspce_list_arrow')
    if (document.querySelector('#media-display-none') == null ){
      workspaceList.setAttribute('id','media-display-none')
    }else{
      workspaceList.removeAttribute('id')
    }
  })
});