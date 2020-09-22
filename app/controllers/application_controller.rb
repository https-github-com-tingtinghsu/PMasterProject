class ApplicationController < ActionController::Base
  #rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :configure_permitted_parameters, if: :devise_controller?
  before_action :update_find_online_users, if: -> { user_signed_in? && (current_user.last_seen_at.nil? || current_user.last_seen_at < 2.minutes.ago)}
  # 使用lamda 執行block 
  


  private
  def not_found
    #redirect_to workspaces_path, notice: '抱歉，資料不存在'
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:t])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:t])
  end

  def update_find_online_users
    logger.info "Update last seen at times timetamp for user id #{current_user.id}" 
    current_user.update_attribute(:last_seen_at, Time.current)
    #logger程式執行時，寫入資訊到記錄檔很有用。而 Rails 替每個環境都準備了一個記錄檔。
  end
end

