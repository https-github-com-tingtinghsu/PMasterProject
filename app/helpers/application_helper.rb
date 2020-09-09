module ApplicationHelper
  def token_storage
    cookies[:user_token] = params[:t]
  end
end
