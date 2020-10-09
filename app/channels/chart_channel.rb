class ChartChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chart_channel"
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
  end
end
