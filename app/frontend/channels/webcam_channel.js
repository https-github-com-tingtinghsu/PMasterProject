import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "WebcamChannel" }, {
  connected() {
    console.log("WebcamChannel connected")
  },

  disconnected() {
  },

  received(data) {
    console.log("received : " + data.type)
  }
});
