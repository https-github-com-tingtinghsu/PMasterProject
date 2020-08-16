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
    mail(:to => user.email, :subject => "New Comment")
    # mail to: "to@example.org"
  end
end
