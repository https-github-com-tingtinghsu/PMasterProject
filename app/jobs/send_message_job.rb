class SendMessageJob < ApplicationJob
  queue_as :default

  def perform(message)
    html = ApplicationController.render(
      partial: 'messages/message',
      locals: {message: message} 
    )
    # console.log(room_id)

    ActionCable.server.broadcast "room_channel_#{message.room_id}", html: html
  end
end
