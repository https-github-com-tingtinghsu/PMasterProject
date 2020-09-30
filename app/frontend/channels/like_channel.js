import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create("LikeChannel", {
  connected() {
  },

  disconnected() {
  },

  received(data) {
  }
});
