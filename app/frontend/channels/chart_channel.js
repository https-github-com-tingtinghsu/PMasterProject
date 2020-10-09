import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create("ChartChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
  }
});
