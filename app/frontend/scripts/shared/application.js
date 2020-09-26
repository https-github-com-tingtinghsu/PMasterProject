document.addEventListener('turbolinks:load', () => {

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

  //Get edit_count && sing_out_button toggle the "is-active"
  const buttonDiv = document.querySelector('.sign-in-buttons')
  const arrow_button = document.querySelector('.arrow_icon')
  arrow_button.addEventListener('click', function(){
    arrow_button.classList.toggle('arrow')
    buttonDiv.classList.toggle('sign-in-buttons-open')
    console.log('aaa')
  })

  //Get edit_task toggle the "is-active"
  const taskTables = document.querySelectorAll('.table')
  // const editTask = document.querySelector('.edit-task')
  const editArrow = document.querySelector('.fa-caret-right')
  
  function toggleTaskName(e){
    taskArrowClass = Array.from(e.target.classList)
    if(taskArrowClass.indexOf("fa-caret-right") !== -1){
      e.target.classList.toggle("arrow")
      e.target.parentNode.parentNode.querySelector(".edit-task").classList.toggle("edit-task-open")
      
     

    }
  }
  
  taskTables.forEach((table)=>{
    table.addEventListener("click", toggleTaskName)
  })
  console.log(taskTables)
  // const item_id = (Number)(item_task.getAttribute('data-item-id'))
  // const task_list = document.querySelector(`#items-task-${item_id}`)
  // task_list.addEventListener('click', function(){
  //   console.log('aaa')
  //   console.log(typeof(item_id))
  //   console.log(task_list)
  // })
});