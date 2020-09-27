class BoardChannel < ApplicationCable::Channel
  def subscribed
    stream_from "board_channel_#{params[:board_id]}"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
