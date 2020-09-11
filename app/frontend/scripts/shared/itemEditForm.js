document.addEventListener('turbolinks:load', () => {
	const formSelect = document.querySelector('#item_status')
	if (formSelect){
		formSelect.setAttribute("class", "border-2 p-2")
	} 
	
  
});