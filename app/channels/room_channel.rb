class RoomChannel < ApplicationCable::Channel
  def subscribed
    stream_from "room_channel_#{params[:room_id]}"
    ActionCable.server.broadcast "online_#{params[:room_id]}", {user: params[:user_email], user_id: current_user.id }
  end

  def unsubscribed
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast "online_#{params[:room_id]}", {user: current_user.id, message:"offline"}
    # byebug
  end
end
