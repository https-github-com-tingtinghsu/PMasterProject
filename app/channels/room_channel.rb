class RoomChannel < ApplicationCable::Channel
  def subscribed
    #登入訂閱
    # stop_all_streams
    stream_from "room_channel_#{params[:room_id]}"
    ActionCable.server.broadcast "online_#{params[:room_id]}", {user: params[:user_name], user_id: current_user.id }
    #ActionCable.server.broadcast 開始廣播
    #"online_#{params[:room_id]}"預計走的通道
    # {user: params[:user_email], user_id: current_user.id } 過程要帶的參數
  end

  def unsubscribed
    # stop_all_streams
    #登出消除訂閱
    # Any cleanup needed when channel is unsubscribed
    ActionCable.server.broadcast "online_#{params[:room_id]}", {user: current_user.id, message:"offline"}
    # byebug
  end
end
