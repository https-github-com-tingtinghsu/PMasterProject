// document.addEventListener('turbolinks:load', () => {
// 	let itemStatus = document.querySelectorAll('.item-status')
// 	if (itemStatus){
// 		itemStatus.forEach(element => {
// 			element.classList.add('p-1')
// 			if (element.textContent.match('待指派')){
// 				element.classList.add('bg-yellow-500')
// 			}else if(element.textContent.match('進行中')){
// 				element.classList.add('bg-blue-300')
// 			}else if(element.textContent.match('卡關中')){
// 				element.classList.add('bg-red-300')
// 			}else if(element.textContent.match('待修改')){
// 				element.classList.add('bg-purple-300')
// 			}else if(element.textContent.match('已完成')){
// 				element.classList.add('bg-gray-400')
// 			}
// 		})
// 	}
// });