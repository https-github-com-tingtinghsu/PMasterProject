document.addEventListener('turbolinks:load', () => {
  initWorkspaceList();

  $("#link-add-workspace").click(function(){
    $("#modal-add-workspace").addClass("is-active")
  })

  $('#btn-save-adding-workspace').click(function(){
    createWorkspace()
  })

  $("#btn-cancel-adding, #btn-close-modal, #btn-save-adding-workspace").click(function(){
    $("#modal-add-workspace").removeClass("is-active")
  })

  $("#add-workspace-name").keydown(function(){
    $("#btn-save-adding-workspace").prop("disabled", $(this).val().length == 0)
  })
})

function initWorkspaceList(){
  // 判斷是否已經有Workspace List
  $.ajax({url: "/workspaces", success: function(result){
    result.forEach(element => 
      $("#sidebar").append(generateWorkspace(element))
    )
  }});
}

function generateWorkspace(workspace){
  return `
    <a class="panel-block is-active workspace-item" data-workspace-id="${workspace.id} ">
      <span class="panel-icon">
      <i class="fas fa-book" aria-hidden="true"></i>
      </span>
      ${workspace.name} 
    </a>
  `
}

function createWorkspace(){
  $.ajax({
    type: "POST",
    url: '/workspaces',
    data: {
      name: $("#add-workspace-name").val()
    },
    success: function(data){
      if(data.success){
        $("#add-workspace-name").val('')
        $("#sidebar").append(generateWorkspace(data))
      }
      else{
        alert("新增失敗！")
      }
    }
  });
}