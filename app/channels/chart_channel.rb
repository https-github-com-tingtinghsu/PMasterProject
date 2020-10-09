class ChartChannel < ApplicationCable::Channel
  def subscribed
    stream_from "chart_channel"
  end

  def unsubscribed
  end
end
