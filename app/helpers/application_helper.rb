module ApplicationHelper
  def token_storage
    # token存在的話才存入cookies, 不然有的時候token為null就找不到看板
    cookies[:user_token] = params[:t] if params[:t].present?
  end
end
