import consumer from "./consumer"
const currentRoomIds = {}
document.addEventListener("turbolinks:load", () => {
    const element = document.querySelector('.chatcontent-box')
    if(!element)return
    //為了解決turbolinks回應問題
    const room_id = element.getAttribute('data-room-id')
    const userEmail = element.getAttribute('data-user')
    const whoOnline = document.querySelector('.who-online')
    if(currentRoomIds[room_id]) return;
    consumer.subscriptions.create({channel: "OnlineChannel", room_id: room_id}, {
      connected() {
        currentRoomIds[room_id] = true
        // Called when the subscription is ready for use on the server
        // console.log(room_id)
      },
    
      disconnected() {
        delete currentRoomIds[room_id]
        // Called when the subscription has been terminated by the server
      },
    
      received(data) {
        const elementExist = document.querySelector(`[user-id='${data.user_id}']`)
        // console.log(elementExist)
        // console.log(data.user_id)
        //登入
        // if (userEmail !== data.user && !elementExist && data.message !== "offline"){
          //判斷不是自己本身、已存在上線文字、不是登出指令訊息的話，繼續執行以下程式碼
        if (!elementExist && data.message !== "offline"){
          //已存在上線文字、不是登出指令訊息的話，繼續執行以下程式碼
          const onlineElement = document.createElement('ul')
          const liElement = document.createElement('li')

          onlineElement.setAttribute("class", "online-user")
          liElement.setAttribute("user-id", data.user_id)
          liElement.innerHTML = `${data.user}<div class="online-point"></div>`
          onlineElement.appendChild(liElement)
          
          whoOnline.insertAdjacentElement('beforeend', onlineElement)
        }
        //登出
        if (data.message === "offline"){
          const offlineElement = document.querySelector(`[user-id='${data.user}']`)
          offlineElement.remove()
        } 
      }
    });
})
