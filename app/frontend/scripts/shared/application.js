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
      //  location.reload()
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
      //  location.reload()
    }
    }) 
  }); 
  
  $('.repository').on("change", function(e){ 
    var id = $(this).find("option:selected").data("user")
    var repository = $(this).find("option:selected").text()
    var org = $(this).val()
    $('.repository-showname').text(repository)
    $.ajax({ 
    url: "/repositories", 
    beforeSend: function(xhr) {xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'))},
    type: "POST", 
    data: {
      "id": id,
      "repository": repository,
      "org": org
    }, 
    success: () =>{
       console.log('完成')
    }
    }) 
  }); 
  
  $('select').on("change",function(e){ 
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
  
});