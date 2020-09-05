document.addEventListener('turbolinks:load', () => {
  initWorkspaceList();

  $("#link-add-workspace").click(function(){
    $("#modal-add-workspace").addClass("is-active")
  })

  $(".btn-cancel-modal, #btn-save-adding-workspace, #btn-confirm-delete-workspace").click(function(){
    $("#modal-add-workspace, #modal-delete-workspace").removeClass("is-active")
  })

  // create
  $('#btn-save-adding-workspace').click(function(){
    createWorkspace()
  })

  // edit
  $("#add-workspace-name").keydown(function(){
    $("#btn-save-adding-workspace").prop("disabled", $(this).val().length == 0)
  })

  // delete
  $("#btn-confirm-delete-workspace").click(function(){
    // data-attribute取值     
    deleteWorkspace($(this).data("workspace-id"))
  })
})


function initWorkspaceList(){
  // 判斷是否已經有Workspace List
  $.ajax({url: "/workspaces", success: function(result){
    result.forEach(element => 
      $("#sidebar").append(showWorkspaceTemplate(element))
    )
  }});
}

function showWorkspaceTemplate(workspace){
  workspaceItem =  $(`
    <div id="workspace-${workspace.id}" class="panel-block is-active workspace-item" data-workspace-id="${workspace.id} ">
      <span class="panel-icon">
        <i class="fas fa-edit"></i>
      </span>
    </div>
  `)
  deleteWorkspaceItem = $(`
    <a class="panel-icon delete-workspace">
      <i class="far fa-trash-alt"></i>
    </a>
  `)
  deleteWorkspaceItem.click(function(){
    $("#modal-delete-workspace").addClass("is-active")
    // data-attribute給值, delete時才有workspace id 
    $("#btn-confirm-delete-workspace").data("workspace-id", workspace.id)
  })
  workspaceItem.append(deleteWorkspaceItem)
  workspaceItem.append(workspace.name)
  return workspaceItem;
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
        $("#sidebar").append(showWorkspaceTemplate(data))
      }
      else{
        alert("新增失敗！")
      }
    }
  });
}

function deleteWorkspace(id){
  $.ajax({
    type: "DELETE",
    url: "/workspaces/" + id,
    success: function(data){
      if(data.success){
        $("#workspace-"+id).remove()
      }
      else{
        alert("刪除失敗！")
      }
    }
  });
}