class HomeController < ApplicationController
  def index
    # redirect_to workspaces_path if current_user
    # byebug
    redirect_to demo_path if current_user
  end
end