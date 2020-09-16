document.addEventListener('turbolinks:load', () => {
	let postIcon = document.querySelectorAll('.postIcon')
	let PostBtnCancel = document.querySelector('#abc123')
	if (postIcon){
		postIcon.forEach(element => {
      element.addEventListener('click', function(){
        document.querySelector('#posts-block').classList.add('is-active-for-posts-block')
      })
		})
	}
	if (PostBtnCancel){	
		PostBtnCancel.addEventListener('click',function(){
			console.log(PostBtnCancel)
			document.querySelector('#posts-block').classList.remove('is-active-for-posts-block')
		})
	}
});