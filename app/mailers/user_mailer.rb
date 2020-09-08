class UserMailer < ActionMailer::Base

  # Subject can be set in your I18n file at config/locales/en.yml
  # with the following lookup:
  #
  #   en.user_mailer.notify_comment.subject
  #
  default :from => "皮老闆 <pmasterproject@gmail.com>"
  def notify_comment(user, comment)
    @greeting = "Hi"
    @comment = comment
    mail(:to => user.email, :subject => "恭喜您註冊成功！PMaster 最有趣的專案管理網站")
    # mail to: "to@example.org"
  end

  def invite_member(send_user, receive_user, workspace)
    @greeting = "Hi"
    @workspace = workspace
    mail(:to => receive_user, :subject => "有人邀請你加入！PMaster 最有趣的專案管理網站")
    # mail to: "to@example.org"
  end
end
