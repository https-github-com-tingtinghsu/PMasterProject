import consumer from "../../javascript/channels/consumer"

// const createChannel = function(name, connection) {
  const test = consumer.subscriptions.create({ channel: "WebcamChannel" }, {
    connected() {
      console.log("WebcamChannel connected")
      // this.send({ sent_by: "Paul", body: "This is a cool chat app." })
      this.perform("speak", {message: "hello"})
    },

    disconnected() {
    },

    received(data) {
      console.log("received : " + data.message)
    }
  });
// }
