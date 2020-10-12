document.addEventListener('turbolinks:load', () => {
	// github-link
    const githubLink = document.querySelector('.github-link-touch')
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
      githubExplore.classList.add('outside-link-board')
      githubExplore.classList.remove('outside-link-board-disappear')
    })
    gitBackNextpage.addEventListener('click',() => {
      githubNextpage.classList.add('outside-link-board-nextpage-disappear')
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
});