document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('.postIcon')
	if (postIcon){
		postIcon.forEach(element => {
			element.addEventListener('click', function(){
				document.querySelector('#posts-block').classList.add('is-active-for-posts-block')
      })
		})
	}
});
