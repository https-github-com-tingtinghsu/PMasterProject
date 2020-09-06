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

  $("#add-workspace-name").keydown(function(){
    // 新增時，沒填名字的話不能儲存
    isWorkspaceNameNull =  ($(this).val().length == 0)
    $("#btn-save-adding-workspace").prop("disabled", isWorkspaceNameNull)
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
    // 列出建立的workspaces
    result.created_workspaces.forEach(element => 
      $("#created-workspaces").append(showWorkspaceTemplate(element))
    )
    // 列出加入的workspaces
    isCreatedWorkspaces = false
    result.member_workspaces.forEach(element => 
      $("#member-workspaces").append(showWorkspaceTemplate(element, isCreatedWorkspaces))
    )
  }});
}

function showWorkspaceTemplate(workspace, isCreated = true){
  workspaceItem =  $(`
    <div id="workspace-${workspace.id}" class="panel-block is-active workspace-item" data-workspace-id="${workspace.id} ">
    </div>
  `)
  editWorkspaceItem = $( `
    <span class="panel-icon">
      <i class="fas fa-edit"></i>
    </span>
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
  if (isCreated){
    workspaceItem.append(editWorkspaceItem)
    workspaceItem.append(deleteWorkspaceItem)
  }
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
        $("#created-workspaces").append(showWorkspaceTemplate(data))
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