class HomeController < ApplicationController
  before_action :authenticate_user!, only: [:dashboard]
  
  def index
    redirect_to dashboard_path if current_user
  end

  def dashboard
    
  end
end