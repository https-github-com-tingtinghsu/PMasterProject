document.addEventListener('turbolinks:load', () => {
	let itemsName = document.querySelectorAll('.item-name')
  if (itemsName) {
    itemsName.forEach(element => {
      $(element).on('click', function(){
        $(element).addClass('item-name-clickevent')
      })
      $(element).keydown(function(event){
        if( event.which == 13 ){
          $(element).removeClass('item-name-clickevent')
        }
      })  
    })
    mainDashboard = document.querySelector('[class="tile is-parent main-dashboard"]')
    console.log(mainDashboard)
    mainDashboard.addEventListener('click', (e)=>{
      if (e.target.className.match('item-name-clickevent')== null){
        document.querySelectorAll('.item-name-clickevent').forEach(el=>{
          el.classList.remove('item-name-clickevent')
        })
      }
    })
  }
  
  // let itemsDescription = document.querySelectorAll('.item-description')
  // if (itemsDescription) {
  //   itemsDescription.forEach(element => {
  //     element.addEventListener('click', function(){
  //       console.log(element)
  //       $(element).addClass('item-description-clickevent')
  //     })
  //   })
  // }
});