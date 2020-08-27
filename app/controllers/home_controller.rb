class HomeController < ApplicationController
  def index
    redirect_to pages_path if current_user
  end
end