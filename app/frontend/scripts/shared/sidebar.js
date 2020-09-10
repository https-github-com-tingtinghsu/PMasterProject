document.addEventListener('turbolinks:load', () => {
  // if($("#btn-logout").length >= 0) {

  // }
  initWorkspaceList();

  $("#link-add-workspace").click(function(){
    // 因為與編輯共用modal, 需要先把name與id清空
    $("input[name=add-workspace-name]").val("")
    $("#btn-save-adding-workspace").data("workspace-id", "")
    $("#modal-add-workspace").addClass("is-active")
  })

  $(".btn-cancel-modal, .btn-save-adding, #btn-confirm-delete-sidebar-item")
  .click(
    function(){
      $("#modal-add-workspace, #modal-add-board, #modal-delete-sidebar-item, #modal-add-workspace-member")
      .removeClass("is-active")
  })

  // create and update workspace
  $('#btn-save-adding-workspace').click(function(){
    if($(this).data("workspace-id").length==0){
      createWorkspace()
    } else{
      updateWorkspace()
    }
  })

  // create and update board
  $('#btn-save-adding-board').click(function(){
    if($(this).data("board-id").length==0){
      // 建立的時候要傳workspace-id
      createBoard($(this).data("workspace-id"))
    } else{
      // 更新的時候要傳board-id
      updateBoard($(this).data("board-id"))
    }
  })

  $("#add-workspace-name, #add-board-name, #add-workspace-member-email").keydown(function(){
    // 新增時，沒填名字的話不能儲存
    isWorkspaceNameNull =  ($(this).val().length == 0)
    $("#btn-save-adding-workspace, #btn-save-adding-board, #btn-send-member-email").prop("disabled", isWorkspaceNameNull)
  })

  // delete
  $("#btn-confirm-delete-sidebar-item").click(function(){
    // data-attribute取值
    isDeleteWorkspace = $("#modal-delete-sidebar-item").data("delete-workspace") 

    if(isDeleteWorkspace){
      deleteWorkspace($(this).data("model-id"))
    } else {
      deleteBoard($(this).data("model-id"))
    }
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
      $("#created-workspaces").append(createSidebarRow(element))
    )
    // 列出加入的workspaces
    isCreatedWorkspaces = false
    result.member_workspaces.forEach(element => 
      $("#member-workspaces").append(createSidebarRow(element, isCreatedWorkspaces))
    )
  }});
}

function createSidebarRow(model, isCreated = true, isWorkspace = true){
  itemType = isWorkspace ? "workspace" : "board"
  sidebarItem =  $(`
    <div id="${itemType}-${model.id}" class=" panel-block is-active ${itemType}-item" data-${itemType}-id="${model.id}" data-${itemType}-name="${model.name}">
    </div>
  `)
  if(itemType=="workspace"){
    $(".panel-block").addClass("text-lg")
  }

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
    $("#modal-add-workspace").addClass("is-active")     
    editWorkspaceId = $(this).parent().data("workspace-id")    
    editWorkspaceName = $(this).parent().data("workspace-name")    

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
    $("#modal-delete-sidebar-item").addClass("is-active")
    $("#modal-delete-sidebar-item").data("delete-workspace", true)   
    // data-attribute給值, delete時要把parent的id抓出來, 因為moreIconElement.click會把this的行為複寫
    $("#btn-confirm-delete-sidebar-item").data("model-id", $(this).parent().data("workspace-id"))
  })

  moreWorkspaceIconElement = $(`
    <a class="panel-icon more-workspace-element" data-workspace-id="${model.id}" data-toggle="false">
      <i class="far fa-folder" id="folder-${model.id}"></i>
    </a>
  `).click(function(){
    console.log($(this).parent())
    // 按一下時，給相反的值 (false -> true; true -> false)
    $(this).data("toggle", !$(this).data("toggle")) 
    if($(this).data("toggle")) {
      $(this).parent().find('a.panel-icon.addition').show()
      getBoardIndex($(this).parent().data("workspace-id"))
      $("#folder-"+ model.id).addClass("fa-folder-open");
    } else {
      $(this).parent().find('a.panel-icon.addition').hide()
      $("div.board-item").remove()
      $("#folder-"+ model.id).removeClass("fa-folder-open");    
    }
  })

  moreBoardIconElement = $(`
    <a class="panel-icon" data-toggle="false">
      <i class="fas fa-arrow-right moreBoardFeature"></i>
    </a>
  `).click(function(){
    // 按一下時，給相反的值 (false -> true; true -> false)
    $(this).data("toggle", !$(this).data("toggle")) 
    if($(this).data("toggle")) {
      $(this).parent().find('a.panel-icon.addition').show()
    } else {
      $(this).parent().find('a.panel-icon.addition').hide()
    }  
  })

  editBoardItem = $( `
  <a class="panel-icon addition edit-board hidden">
    <i class="fas fa-edit text-teal-600"></i>
  </a>
`).click(function(){
    $("#modal-add-board").addClass("is-active")
    editBoardId = $(this).parent().data("board-id")
    editBoardName = $(this).parent().data("board-name")      
    // 如果已經有board name, 就預設填進去編輯欄位
    $("input[name=add-board-name]").val(editBoardName)
    // board id塞進儲存按鈕
    $("#btn-save-adding-board").data("board-id", editBoardId)
  })

  deleteBoardItem = $(`
    <a class="panel-icon addition delete-board hidden">
      <i class="far fa-trash-alt text-red-400"></i>
    </a>
  `).click(function(){
    $("#modal-delete-sidebar-item").addClass("is-active")
    $("#modal-delete-sidebar-item").data("delete-workspace", false)
    $("#btn-confirm-delete-sidebar-item").data("model-id", $(this).parent().data("board-id"))
  })

  if (isCreated && isWorkspace) {
    // 我創的workspace  
    sidebarItem.append(moreWorkspaceIconElement)    
    sidebarItem.append(addMemberToWorkspace)    
    sidebarItem.append(editWorkspaceItem)    
    sidebarItem.append(deleteWorkspaceItem)
    sidebarItem.append("<p>"+model.name+"</p>")  
  } else if(isWorkspace == false) {
    // 我創的board
    // /boards/:board_id/groups(.:format)
    boardUrl = "/boards/" + model.id + "/groups"     
    sidebarItem.append(moreBoardIconElement)
    sidebarItem.append(editBoardItem)     
    sidebarItem.append(deleteBoardItem)
    sidebarItem.append("<a id='board-link-" + model.id  + "' href=" + boardUrl + ">" + model.name + "</a>")             
  } else {
    // 我屬於的workspace 
    sidebarItem.append(moreWorkspaceIconElement)
    sidebarItem.append("<p>"+model.name+"</p>")    
  }
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
        $("#created-workspaces").append(createSidebarRow(result))
        alert("新增成功！")        
      }
      else{
        alert("新增失敗！")
      }
    }
  });
}

function updateWorkspace(){
  upadteWorkspaceId = $("#btn-save-adding-workspace").data("workspace-id")
  $.ajax({
    type: "PUT",
    url: '/workspaces/' + upadteWorkspaceId,
    data: {
      name: $("#add-workspace-name").val()
    },
    success: function(result){
      if(result.success){
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
        $("#add-new-board-"+id).remove()
        alert("刪除成功！")        
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
      receive_user_email: memberEmail
    },
    success: function(result){
      if(result.success){
        console.log(result)
        alert("邀請成功！")
        $("#modal-add-workspace-member").removeClass("is-active")        
      }
      else{
        console.log(result)
        alert("邀請失敗，請確認您輸入是有效的Email！")
      }
    }
  });  
  $("add-workspace-member-email").val('')
}

function getBoardIndex(workspaceId){
  workspaceElementId = "#workspace-" + workspaceId
  $.ajax({
    type: "GET",
    url: "/workspaces/" + workspaceId + "/boards",
    success: function(result){
      result.created_boards.forEach(element =>
        createSidebarRow(element, false, false).insertAfter(workspaceElementId)
      )
      addNewBoardRow(workspaceId).insertAfter(workspaceElementId)
      if(result.created_boards.length > 0 ){
        last_id = result.created_boards[0].id
        $("#board-"+ last_id).addClass("last-board-of-"+workspaceId)
      } else {
        $("#add-new-board-"+workspaceId).addClass("last-board-of-"+workspaceId)
      }
    }
  }); 
}

function addNewBoardRow(workspaceId){
  sidebarItem =  $(`
    <div id="add-new-board-${workspaceId}" class="panel-block is-active board-item" data-workspace-id="${workspaceId}">
    </div>
  `)
  addBoardItem = $(`
    <a class="panel-icon">
      <i class="fas fa-plus-square"></i>
    </a>
  `).click(function(){
    $("#btn-save-adding-board").data("workspace-id", $(this).parent().data("workspace-id"))
    $("#modal-add-board").addClass("is-active")
  })

  sidebarItem.append(addBoardItem)
  sidebarItem.append(`<p><i>新增看板...</i></p>`) 
  return sidebarItem;
}

function deleteBoard(id){
  $.ajax({
    type: "DELETE",
    url: "/boards/" + id,
    success: function(data){
      if(data.success){
        $("#board-"+id).remove()
      }
      else{
        alert("刪除失敗！")
      }
    }
  });
}

function createBoard(workspaceId){
  $.ajax({
    type: "POST",
    url: '/workspaces/' + workspaceId + '/boards',
    data: {
      name: $("#add-board-name").val()
    },
    success: function(result){
      if(result.success){
        $("#add-board-name").val('')
        createSidebarRow(result, false, false).insertAfter("div.last-board-of-"+workspaceId)
        alert("新增成功！") 
      }
      else{
        alert("新增失敗！")
      }
    }
  });
}

function updateBoard(boardId){
  editBoardName = $("#add-board-name").val()
  $.ajax({
    type: "PUT",
    url: '/boards/' + boardId,
    data: {
      name: $("#add-board-name").val()
    },
    success: function(result){
      if(result.success){
        $("#board-link-" + boardId).text($("#add-board-name").val())
        $("#add-board-name").val('')
        alert("編輯成功！")
        // 把rails右半區的看板名稱用js換掉
        updateBoardName = "看板：" + editBoardName
        $(".main-board-title").text(updateBoardName)
      }
      else{
        alert("編輯失敗！")
      }
    }
  }); 
}