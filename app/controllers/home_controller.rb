class HomeController < ApplicationController
  def index
    redirect_to workspaces_path if current_user
  end
end