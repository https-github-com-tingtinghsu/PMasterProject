document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('.fa-comment-dots')
	if (postIcon){
		postIcon.addEventListener('click', function(e){
			console.log(e)

		})
	}
});