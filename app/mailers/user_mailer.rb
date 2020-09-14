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
  end

  def invite_member(invitation)
    @greeting = "Hi, 會員您好，"
    @workspace = invitation.workspace
    @uuid = invitation.token
    mail(:to => invitation.receive_user_email, :subject => "邀請您加入#{@workspace.name}工作區！- PMaster 最有趣的專案管理網站")
  end

  def invite_new(invitation)
    @greeting = "Hi"
    @workspace = invitation.workspace
    @uuid = invitation.token
    mail(:to => invitation.receive_user_email, :subject => "邀請您註冊加入#{@workspace.name}工作區！- PMaster 最有趣的專案管理網站")
  end
end
