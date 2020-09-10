document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('#postItem')
	let btnCancel = document.querySelectorAll('.btn-cancel-modal')
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
});