class WebcamChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "webcam_channel_#{params[:name]}"
    stream_from "webcam_channel_1"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
