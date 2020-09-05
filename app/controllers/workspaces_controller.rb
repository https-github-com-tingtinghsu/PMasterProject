class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :find_workspace, only: [:update, :destroy]
  def index
    @workspaces = current_user.created_workspaces
    render json: @workspaces, only: [:id, :name]
  end

  def create
    @workspace = current_user.created_workspaces.new(name: params[:name])
    render json: { 
      success: @workspace.save,
      id: @workspace.id,
      name: @workspace.name
    }
  end

  def update  
    if @workspace.update(workspace_params)
      redirect_to workspaces_path, notice: "更新工作區成功"
    else
      render :edit
    end
  end

  def destroy
    @workspace.destroy
    render json: { 
      success: true
    }
  end

  private
  def find_workspace
    @workspace = Workspace.find(params[:id])
  end

  def workspace_params
    params.require(:workspace).permit(:name)
  end

end