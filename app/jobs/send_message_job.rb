class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    me = ApplicationController.render(
      partial: 'messages/me',
      locals: {message: message} 
    )
    others = ApplicationController.render(
      partial: 'messages/others',
      locals: {message: message} 
    )
    ActionCable.server.broadcast "room_channel_#{message.room_id}",
    me: me, others: others, message: message
  end
end
