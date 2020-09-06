document.addEventListener('turbolinks:load', () => {
  initWorkspaceList();

  $("#link-add-workspace").click(function(){
    // 因為與編輯共用modal, 需要先把name與id清空
    $("input[name=add-workspace-name]").val("")
    $("#btn-save-adding-workspace").data("workspace-id", "")
    $("#modal-add-workspace").addClass("is-active")
  })

  $(".btn-cancel-modal, #btn-save-adding-workspace, #btn-confirm-delete-workspace")
  .click(
    function(){
      $("#modal-add-workspace, #modal-delete-workspace, #modal-add-workspace-member")
      .removeClass("is-active")
  })

  // create and update
  $('#btn-save-adding-workspace').click(function(){
    if($(this).data("workspace-id").length==0){
      createWorkspace()
    } else{
      updateWorkspace()
    }
  })

  $("#add-workspace-name, #add-workspace-member-email").keydown(function(){
    // 新增時，沒填名字的話不能儲存
    isWorkspaceNameNull =  ($(this).val().length == 0)
    $("#btn-save-adding-workspace, #btn-send-member-email").prop("disabled", isWorkspaceNameNull)
  })

  // delete
  $("#btn-confirm-delete-workspace").click(function(){
    // data-attribute取值     
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

function showWorkspaceTemplate(model, isCreated = true, isWorkspace = true){
  itemType = isWorkspace ? "workspace" : "board"
  sidebarItem =  $(`
    <div id="${itemType}-${model.id}" class=" panel-block is-active ${itemType}-item" data-${itemType}-id="${model.id}" data-${itemType}-name="${model.name}">
    </div>
  `)

  addMemberToWorkspace = $(`
    <a class="panel-icon addition hidden">
      <i class="fas fa-user-plus text-teal-600"></i>
    </a>
  `).click(function(){
    $("#modal-add-workspace-member").addClass("is-active")    
    memberAddWorkspaceId = $(this).parent().data("workspace-id")
    $("#btn-send-member-email").data("workspace-id", memberAddWorkspaceId) 
  })

  editWorkspaceItem = $( `
    <a class="panel-icon addition edit-workspace hidden">
      <i class="fas fa-edit text-teal-600"></i>
    </a>
  `).click(function(){
    editWorkspaceId = $(this).parent().data("workspace-id")    
    editWorkspaceName = $(this).parent().data("workspace-name")    
    // console.log(editWorkspaceName)
    $("#modal-add-workspace").addClass("is-active") 
    // 如果已經有workspace name, 就預設填進去編輯欄位
    $("input[name=add-workspace-name]").val(editWorkspaceName)
    // workspace id塞進儲存按鈕
    $("#btn-save-adding-workspace").data("workspace-id", editWorkspaceId)
  })

  deleteWorkspaceItem = $(`
    <a class="panel-icon addition delete-workspace hidden">
      <i class="far fa-trash-alt text-red-400"></i>
    </a>
  `).click(function(){
    $("#modal-delete-workspace").addClass("is-active")
    // data-attribute給值, delete時要把parent的id抓出來, 因為moreIconElement.click會把this的行為複寫
    $("#btn-confirm-delete-workspace").data("workspace-id", $(this).parent().data("workspace-id"))
  })

  moreIconElement = $(`
    <a class="panel-icon more-workspace-element" data-workspace-id="${model.id}" data-toggle="false">
      <i class="fas fa-cog"></i>
    </a>
  `).click(function(){
    // 按一下時，給相反的值 (false -> true; true -> false)
    $(this).data("toggle", !$(this).data("toggle")) 
    if($(this).data("toggle")) {
      $(this).parent().find('a.panel-icon.addition').show()
      getBoardIndex($(this).parent().data("workspace-id"))
    } else {
      $(this).parent().find('a.panel-icon.addition').hide()
      $("div.board-item").remove()
    }
  })

  showBoard = $(`
    <a class="panel-icon">
      <i class="fas fa-arrow-right"></i>
    </a>
  `)

  if (isCreated && isWorkspace) {   
    sidebarItem.append(moreIconElement)    
    sidebarItem.append(addMemberToWorkspace)    
    sidebarItem.append(editWorkspaceItem)    
    sidebarItem.append(deleteWorkspaceItem)
  } else if(isWorkspace == false) {

    sidebarItem.append(showBoard)     
  }

  sidebarItem.append("<p>"+model.name+"</p>")  
  return sidebarItem;
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
        alert("新增成功！")        
      }
      else{
        alert("新增失敗！")
      }
    }
  });
}

function updateWorkspace(){
  // console.log("ready to update!")
  upadteWorkspaceId = $("#btn-save-adding-workspace").data("workspace-id")
  // console.log($("#add-workspace-name").val())
  $.ajax({
    type: "PUT",
    url: '/workspaces/' + upadteWorkspaceId,
    data: {
      name: $("#add-workspace-name").val()
    },
    success: function(result){
      if(result.success){
        console.log(result)
        $("#workspace-" + upadteWorkspaceId + " p").text($("#add-workspace-name").val())
        $("#add-workspace-name").val('')
        alert("編輯成功！")         
      }
      else{
        alert("編輯失敗！")
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

function getBoardIndex(workspaceId){
  console.log(workspaceId)
  workspaceElementId = "#workspace-" + workspaceId
  $.ajax({
    type: "GET",
    url: "/workspaces/" + workspaceId + "/boards",
    success: function(result){
        // console.log(result)
        result.created_boards.forEach(element =>
          showWorkspaceTemplate(element, false, false).insertAfter(workspaceElementId)
          
        )
      }
  }); 
}