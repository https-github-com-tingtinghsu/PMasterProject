import consumer from "../../javascript/channels/consumer"

document.addEventListener("turbolinks:load", () => {
  const element = document.querySelector('.chartjs-size-monitor')
  if(!element)return

  consumer.subscriptions.create({ channel: "ChartChannel", group_id: group_id  }, {
    connected() {
      console.log('ChartChannel')
    },

    disconnected() {
    },

    received(data) {
    }
  });
})
