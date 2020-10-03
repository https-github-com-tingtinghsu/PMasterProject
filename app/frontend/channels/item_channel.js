import consumer from "../../javascript/channels/consumer"

consumer.subscriptions.create({ channel: "ItemChannel" }, {
  connected() {
    // Called when the subscription is ready for use on the server
  },

  disconnected() {
  },

  received(data) {
    $('#' + data.itemid).val(data.itemstatus)
  }
});
