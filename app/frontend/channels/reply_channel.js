import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create("ReplyChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
  }
});
