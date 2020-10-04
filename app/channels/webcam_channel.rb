class WebcamChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "webcam_channel_#{params[:name]}"
    stream_from "webcam_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end

  def speak data
    ActionCable.server.broadcast("webcam_channel", message: data["message"])
  end
end
