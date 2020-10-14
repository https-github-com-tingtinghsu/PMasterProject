// document.addEventListener('turbolinks:load', () => {
// 	let itemsName = document.querySelectorAll('.item-name')
//   // console.log(tooltips)
//   if (itemsName) {
//     itemsName.forEach(element => {
//       element.addEventListener('mouseover', function(){
//         let itemNameContent = $(element).data("itemName").toString()
//         // console.log(itemNameContent)
//         if ( itemNameContent.length > 11){
//           $(element).addClass('.has-tooltip-bottom')
//           $(element).attr( "data-tooltip",itemNameContent)
//         }

//       })
//     })
//   }
  
//   let itemsDescription = document.querySelectorAll('.item-description')
//   if (itemsDescription) {
//     itemsDescription.forEach(element => {
//       element.addEventListener('mouseover', function(){
//         var itemsDescriptionContent = $(element).data("itemDescription").toString()
//         // console.log(itemNameContent)
//         if ( itemsDescriptionContent.length > 15){
//           $(element).addClass('.has-tooltip-bottom')
//           $(element).attr( "data-tooltip",itemsDescriptionContent)
//         }

//       })
//     })
//   }
// });