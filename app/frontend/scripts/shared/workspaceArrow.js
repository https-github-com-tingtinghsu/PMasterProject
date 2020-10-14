document.addEventListener('turbolinks:load', () => {
  const workspaceToggle = document.querySelector('.workspace-list-colse')
  console.log(workspaceToggle)
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


