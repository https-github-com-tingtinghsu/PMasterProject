document.addEventListener('turbolinks:load', () => {

  // github-link

  const githubLink = document.querySelector('.github-link-img')
  const githuBoard = document.querySelector('.outside-link-background-disappear')
  const githuBoardIntegration = document.querySelector('.outside-link-board-integrations-disappear')
  const githubMenuItem = document.querySelector('.outside-link-item')
  const gitBack = document.querySelector('.outside-link-back')
  const githubExplore = document.querySelector('.outside-link-board')
  const githubNextpage = document.querySelector('.outside-link-board-nextpage-disappear')
  const gitBackNextpage = document.querySelector('.outside-link-back-nextpage')
  const gitBackNextpageApear = document.querySelector('.outside-link-board-nextpage')
  const githubThirdpage = document.querySelector('.outside-link-board-thirdpage-disappear')
  const thirdpageClick = document.querySelector('.outside-link-item-nextpage')
  const gitBackThirdpage = document.querySelector('.outside-link-back-thirdpage')
  const btnIntegrations = document.querySelector('.btn-integrations')
  const btnExplore = document.querySelector('.btn-explore')
  // const outsideLinkClose = document.querySelector('.close')

  $('.close').each(()=>{
      $('.close').on("click",() =>{
        githuBoard.classList.remove('outside-link-background')
        githuBoard.classList.add('outside-link-background-disappear')
      })
  })
  // outsideLinkClose.forEach((e) => {
  //   e.addEventListener('click', () => {
  //     githuBoard.classList.remove('outside-link-background')
  //     githuBoard.classList.add('outside-link-background-disappear')
  //   })
  // })
  githubLink.addEventListener('click',() => {
    githuBoard.classList.remove('outside-link-background-disappear')
    githuBoard.classList.add('outside-link-background')

  })
  gitBack.addEventListener('click',() => {
    githuBoard.classList.remove('outside-link-background')
    githuBoard.classList.add('outside-link-background-disappear')
  })
  githubMenuItem.addEventListener('click',() => {
    githubExplore.classList.remove('outside-link-board')
    githubExplore.classList.add('outside-link-board-disappear')
    githubNextpage.classList.remove('outside-link-board-nextpage-disappear')
    githubNextpage.classList.add('outside-link-board-nextpage')

  })
  btnIntegrations.addEventListener('click',() => {
    githubExplore.classList.remove('outside-link-board')
    githubExplore.classList.add('outside-link-board-disappear')
    githuBoardIntegration.classList.remove('outside-link-board-integrations-disappear')
    githuBoardIntegration.classList.add('outside-link-board-integrations')

  })
  btnExplore.addEventListener('click',() => {
    githuBoardIntegration.classList.add('outside-link-board-integrations-disappear')
    githuBoardIntegration.classList.remove('outside-link-board-integrations')
    console.log(githuBoardIntegration)
    githubExplore.classList.add('outside-link-board')
    githubExplore.classList.remove('outside-link-board-disappear')
  })
  gitBackNextpage.addEventListener('click',() => {
    githubNextpage.classList.add('outside-link-board-nextpage-disdisappear')
    githubNextpage.classList.remove('outside-link-board-nextpage')
    githubExplore.classList.add('outside-link-board')
    githubExplore.classList.remove('outside-link-board-disappear')
  })
  thirdpageClick.addEventListener('click', () =>{
    githubNextpage.classList.add('outside-link-board-nextpage-disappear')
    githubNextpage.classList.remove('outside-link-board-nextpage')
    githubThirdpage.classList.add('outside-link-board-thirdpage')
    githubThirdpage.classList.remove('outside-link-board-thirdpage-disappear')

  })
  gitBackThirdpage.addEventListener('click',() => {
    githubThirdpage.classList.add('outside-link-board-thirdpage-disappear')
    githubThirdpage.classList.remove('outside-link-board-thirdpage')
    githubNextpage.classList.add('outside-link-board-nextpage')
    githubNextpage.classList.remove('outside-link-board-nextpage-disappear')
  })


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
    console.log('aaa')
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
  // console.log(taskTables)


  
  
});