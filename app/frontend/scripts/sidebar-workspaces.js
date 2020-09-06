document.addEventListener('turbolinks:load', () => {
  initWorkspaceList();

  $("#link-add-workspace").click(function(){
    $("#modal-add-workspace").addClass("is-active")
  })

  $(".btn-cancel-modal, #btn-save-adding-workspace, #btn-confirm-delete-workspace")
  .click(
    function(){
      $("#modal-add-workspace, #modal-delete-workspace, #modal-add-workspace-member")
      .removeClass("is-active")
  })

  // create
  $('#btn-save-adding-workspace').click(function(){
    createWorkspace()
  })

  $("#add-workspace-name, #add-workspace-member-email").keydown(function(){
    // 新增時，沒填名字的話不能儲存
    isWorkspaceNameNull =  ($(this).val().length == 0)
    $("#btn-save-adding-workspace, #btn-send-member-email").prop("disabled", isWorkspaceNameNull)
  })

  // delete
  $("#btn-confirm-delete-workspace").click(function(){
    // data-attribute取值     
    // console.log($(this).data("workspace-id"))
    deleteWorkspace($(this).data("workspace-id"))
  })

  // email
  $('#btn-send-member-email').click(function(){
    sendMemeberEmail()
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

  addMemberToWorkspace = $(`
    <span class="panel-icon">
      <i class="fas fa-user-plus"></i>
    </span>
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

  moreIconElement = $(`
  <a class="panel-icon more-workspace-element" data-toggle="false">
    <i class="fas fa-cog"></i>
  </a>
  `)

  moreIconElement.click(function(){
    // 按一下時，給相反的值 (false -> true; true -> false)
    $(this).data("toggle", !$(this).data("toggle")) 
    // console.log($(this).data("toggle"))
    if($(this).data("toggle")) {
      $(deleteWorkspaceItem).insertAfter($(this))   
      $(editWorkspaceItem).insertAfter($(this))
      $(addMemberToWorkspace).insertAfter($(this)) 
    } else {
      $(deleteWorkspaceItem).remove()
      $(editWorkspaceItem).remove()
      $(addMemberToWorkspace).remove()      
    }
  })

  deleteWorkspaceItem.click(function(){
    $("#modal-delete-workspace").addClass("is-active")
    // data-attribute給值, delete時要把parent的id抓出來, 因為moreIconElement.click會把this的行為複寫
    $("#btn-confirm-delete-workspace").data("workspace-id", $(this).parent().data("workspace-id"))
  })

  addMemberToWorkspace.click(function(){
    $("#modal-add-workspace-member").addClass("is-active")    
    memberAddWorkspaceId = $(this).parent().data("workspace-id")
    $("#btn-send-member-email").data("workspace-id", memberAddWorkspaceId) 
    // console.log(memberAddWorkspaceId)
  })

  if (isCreated){
    workspaceItem.append(moreIconElement)    
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
    success: function(result){
      if(result.success){
        $("#add-workspace-name").val('')
        $("#created-workspaces").append(showWorkspaceTemplate(result))
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

function sendMemeberEmail(){
  memberEmail = $("#add-workspace-member-email").val()
  workspaceId = $("#btn-send-member-email").data("workspace-id")
  $.ajax({
    type: "GET",
    url: "/workspaces/" + workspaceId + "/add_member",
    data: {
      email: memberEmail
    },
    success: function(result){
      if(result.success){
        console.log(result)
      }
      else{
        console.log(result)
        alert("寄送失敗！")
      }
    }
  });  
  $("add-workspace-member-email").val('')
}