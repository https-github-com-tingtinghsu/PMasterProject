class ReplyChannel < ApplicationCable::Channel
  def subscribed
    stream_from "reply_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
