class PagesController < ApplicationController
  layout 'page_layout'
  def index
    @workspaces = current_user.workspaces.all
    respond_to do |format|
      format.json { render json: @workspaces }
      format.html { render :index }
    end
  end
end