document.addEventListener('turbolinks:load', () => {
	let itemsName = document.querySelectorAll('.item-name')
  if (itemsName) {
    itemsName.forEach(element => {
      $(element).on('click', function(){
        $(element).addClass('item-name-clickevent')
      })
      $(element).on('keydown',function(event){
        if( event.which == 13 ){
          $(element).removeClass('item-name-clickevent')
        }
      })  
    })
    mainDashboard = document.querySelector('[class="tile is-parent main-dashboard"]')
    // console.log(mainDashboard)
    if(!mainDashboard)return
    mainDashboard.addEventListener('click', (e)=>{
      if (e.target.className.match('item-name-clickevent')== null){
        document.querySelectorAll('.item-name-clickevent').forEach(el=>{
          el.classList.remove('item-name-clickevent')
        })
      }
    })
  }
  
  let itemsDescription = document.querySelectorAll('.item-description')
  if (itemsDescription) {
    itemsDescription.forEach(element => {
      $(element).on('click', function(){
        // console.log(element)
        $(element).addClass('item-description-clickevent')
      })
      $(element).on('keydown',function(event){
        if( event.which == 13 ){
          $(element).removeClass('item-description-clickevent')
        }
      })  
    })
    mainDashboard = document.querySelector('[class="tile is-parent main-dashboard"]')
    // console.log(mainDashboard)
    mainDashboard.addEventListener('click', (e)=>{
      if (e.target.className.match('item-description-clickevent')== null){
        document.querySelectorAll('.item-description-clickevent').forEach(el=>{
          el.classList.remove('item-description-clickevent')
        })
      }
    })
  }
});