class ChartChannel < ApplicationCable::Channel
  def subscribed
    # stream_from "chart_channel_#{params[:member_id]}"
  end

  def unsubscribed
  end
end
