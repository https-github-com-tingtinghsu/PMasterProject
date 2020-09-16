document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('.postIcon')
	let btnCancel = document.querySelectorAll('.btn-cancel-modal')
	let btnSubmit = document.querySelector('#btn-post-submit')
	if (postIcon){
		postIcon.forEach(element => {
			element.addEventListener('click', function(){
				getElementaId = element.getAttribute('id') // 印出postIcon-7
				postIconTag = document.getElementById(getElementaId) // <a id="postIcon-7">...</a>
				itemId = postIconTag.getAttribute("data-item-id") // 7
				getElementItemId = "item-id-"+itemId
				itemName = document.getElementById(getElementItemId).innerText
				// console.log(itemName)
				document.querySelector('.post-card-title').textContent = itemName

				document.querySelector("#modal-posts-content").classList.add("is-active")
				let itemId = element.getAttribute("data-item-id")
				let addedPost = document.querySelectorAll(".added-post")
				addedPost.forEach(post =>{
					if (itemId == post.getAttribute("data-item-id")){
						post.setAttribute("style","display:block")
					}else{
						post.setAttribute("style","display:none")
					}
				})
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
});