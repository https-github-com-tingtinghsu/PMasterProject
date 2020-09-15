class ApplicationController < ActionController::Base
  #rescue_from ActiveRecord::RecordNotFound, with: :not_found
  before_action :configure_permitted_parameters, if: :devise_controller?
  
  private
  def not_found
    #redirect_to workspaces_path, notice: '抱歉，資料不存在'
  end

  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_up, keys: [:t])
    devise_parameter_sanitizer.permit(:sign_in, keys: [:t])
  end
end

