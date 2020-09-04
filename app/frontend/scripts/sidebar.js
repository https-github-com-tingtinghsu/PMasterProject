document.addEventListener('turbolinks:load', () => {
  $.ajax({url: "/workspaces", success: function(result){
    console.log(result)
    result.forEach(element => 
      $("#sidebar").append(generateWorkspace(element))
    )
  }});
})

function generateWorkspace(workspace){
  return `
    <a class="panel-block is-active" data-workspace-id="${workspace.id} ">
      <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      ${workspace.name} 
    </a>
  `
}