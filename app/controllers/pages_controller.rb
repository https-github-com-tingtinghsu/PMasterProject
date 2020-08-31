class PagesController < ApplicationController
  before_action :authenticate_user!
  layout 'page_layout'
  def index
    @workspaces = current_user.workspaces.all
    if @workspaces
      respond_to do |format|
      format.json { render json: @workspaces }
      format.html { render :index }
      end
    else
      
    end
  end
end