import consumer from "../../javascript/channels/consumer"

document.addEventListener('turbolinks:load', () => {

  const element = document.querySelector('.group-item-list')
  if(!element)return

  const board_id = element.getAttribute('data-board-id')
  // console.log("board_id :" + board_id)

  consumer.subscriptions.create({ channel: "BoardChannel", board_id: board_id }, {
    connected() {
    },

    disconnected() {
    },

    received(data) {
      if(location.pathname === "/boards/2/groups")
        window.location.reload();
      // console.log(data_board_id)
    }
  });
})
