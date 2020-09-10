document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('#postItem')
	let btnCancel = document.querySelectorAll('.btn-cancel-modal')
	let btnSubmit = document.querySelector('#btn-post-submit')
	if (postIcon){
		postIcon.forEach(element => {
			element.addEventListener('click', function(){
				document.querySelector("#modal-posts-content").classList.add("is-active")
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
			if (btnSubmit.dataset.post-id == 0){
				// createpost()
				console.log('123');
			} else{
				// updatePost()
			}
		})
	}
});