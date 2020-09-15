class InviteMemberMailJob < ApplicationJob
  queue_as :default

  def perform(invitation)
    UserMailer.invite_member(invitation).deliver_now!
  end
end
