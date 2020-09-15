class InviteNewMailJob < ApplicationJob
  queue_as :default

  def perform(invitation)
    UserMailer.invite_new(invitation).deliver_now!
  end
end
