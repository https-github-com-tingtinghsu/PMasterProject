document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('.postIcon')
	let btnCancel = document.querySelectorAll('.btn-cancel-modal')
	let btnSubmit = document.querySelector('#btn-post-submit')
	if (postIcon){
		postIcon.forEach(element => {
			element.addEventListener('click', function(){
				getElementaId = element.getAttribute('id')
				postIcon = document.getElementById(getElementaId)
				itemId = postIcon.getAttribute("data-item-id")
				getElementItemId = "item-id-"+itemId
				itemName = document.getElementById(getElementItemId).innerText
				console.log(itemName)
				document.querySelector('.post-card-title').textContent = itemName

				document.querySelector("#modal-posts-content").classList.toggle("is-active")
				let itemId = element.getAttribute("data-item-id")
				let addedPost = document.querySelectorAll(".added-post")
				addedPost.forEach(post =>{
					// if (post.getAttribute("data-item-id")==itemId){
						
					// }
				})
				// console.log(addedPost)
				// if
			})
		})
	}
	if (btnCancel){
		btnCancel.forEach(element => {
			element.addEventListener('click', function(){
				document.querySelector("#modal-posts-content").classList.remove("is-active")
			})
		})
	}
	if (btnSubmit){
		btnSubmit.addEventListener('click', function(){
			if (btnSubmit.dataset.postId == 0){
				// createpost()
				console.log('123');
			} else{
				// updatePost()
			}
		})
	}
});

// function createPost(itemId){
//   $.ajax({
//     type: "POST",
//     url: "/items/" + itemId + "/posts",
//     data: {
//       name: $("#add-post-name").val()
//     },
//     success: function(result){
//       if(result.success){
//         $("#add-post-name").val('')
//         $("#created-posts").append(createSidebarRow(result))
//         alert("新增成功！")        
//       }
//       else{
//         alert("新增失敗！")
//       }
//     }
//   });
// }

// function updateWorkspace(){
//   upadteWorkspaceId = $("#btn-save-adding-workspace").data("workspace-id")
//   $.ajax({
//     type: "PUT",
//     url: '/workspaces/' + upadteWorkspaceId,
//     data: {
//       name: $("#add-workspace-name").val()
//     },
//     success: function(result){
//       if(result.success){
//         $("#workspace-" + upadteWorkspaceId + " p").text($("#add-workspace-name").val())
//         $("#add-workspace-name").val('')
//         alert("編輯成功！")         
//       }
//       else{
//         alert("編輯失敗！")
//       }
//     }
//   });  
// }

// function deleteWorkspace(id){
//   $.ajax({
//     type: "DELETE",
//     url: "/workspaces/" + id,
//     success: function(data){
//       if(data.success){
//         $("#workspace-"+id).remove()
//         $("#add-new-board-"+id).remove()
//         alert("刪除成功！")        
//       }
//       else{
//         alert("刪除失敗！")
//       }
//     }
//   });
// }

// function sendMemeberEmail(){
//   memberEmail = $("#add-workspace-member-email").val()
//   workspaceId = $("#btn-send-member-email").data("workspace-id")
//   $.ajax({
//     type: "GET",
//     url: "/workspaces/" + workspaceId + "/add_member",
//     data: {
//       receive_user_email: memberEmail
//     },
//     success: function(result){
//       if(result.success){
//         console.log(result)
//         alert("邀請成功！")
//         $("#modal-add-workspace-member").removeClass("is-active")        
//       }
//       else{
//         console.log(result)
//         alert("邀請失敗，請確認您輸入是有效的Email！")
//       }
//     }
//   });  
//   $("add-workspace-member-email").val('')
// }

// function getBoardIndex(workspaceId){
//   workspaceElementId = "#workspace-" + workspaceId
//   $.ajax({
//     type: "GET",
//     url: "/workspaces/" + workspaceId + "/boards",
//     success: function(result){
//       result.created_boards.forEach(element =>
//         createSidebarRow(element, false, false).insertAfter(workspaceElementId)
//       )
//       addNewBoardRow(workspaceId).insertAfter(workspaceElementId)
//       if(result.created_boards.length > 0 ){
//         last_id = result.created_boards[0].id
//         $("#board-"+ last_id).addClass("last-board-of-"+workspaceId)
//       } else {
//         $("#add-new-board-"+workspaceId).addClass("last-board-of-"+workspaceId)
//       }
//     }
//   }); 
// }

// function addNewBoardRow(workspaceId){
//   sidebarItem =  $(`
//     <div id="add-new-board-${workspaceId}" class="panel-block is-active board-item" data-workspace-id="${workspaceId}">
//     </div>
//   `)
//   addBoardItem = $(`
//     <a class="panel-icon">
//       <i class="fas fa-plus-square"></i>
//     </a>
//   `).click(function(){
//     $("#btn-save-adding-board").data("workspace-id", $(this).parent().data("workspace-id"))
//     $("#modal-add-board").addClass("is-active")
//   })

//   sidebarItem.append(addBoardItem)
//   sidebarItem.append(`<p><i>新增看板...</i></p>`) 
//   return sidebarItem;
// }

// function deleteBoard(id){
//   $.ajax({
//     type: "DELETE",
//     url: "/boards/" + id,
//     success: function(data){
//       if(data.success){
//         $("#board-"+id).remove()
//       }
//       else{
//         alert("刪除失敗！")
//       }
//     }
//   });
// }

// function createBoard(workspaceId){
//   $.ajax({
//     type: "POST",
//     url: '/workspaces/' + workspaceId + '/boards',
//     data: {
//       name: $("#add-board-name").val()
//     },
//     success: function(result){
//       if(result.success){
//         $("#add-board-name").val('')
//         createSidebarRow(result, false, false).insertAfter("div.last-board-of-"+workspaceId)
//         alert("新增成功！") 
//       }
//       else{
//         alert("新增失敗！")
//       }
//     }
//   });
// }

// function updateBoard(boardId){
//   editBoardName = $("#add-board-name").val()
//   $.ajax({
//     type: "PUT",
//     url: '/boards/' + boardId,
//     data: {
//       name: $("#add-board-name").val()
//     },
//     success: function(result){
//       if(result.success){
//         $("#board-link-" + boardId).text($("#add-board-name").val())
//         $("#add-board-name").val('')
//         alert("編輯成功！")
//         // 把rails右半區的看板名稱用js換掉
//         updateBoardName = "看板：" + editBoardName
//         $(".main-board-title").text(updateBoardName)
//       }
//       else{
//         alert("編輯失敗！")
//       }
//     }
//   }); 
// }