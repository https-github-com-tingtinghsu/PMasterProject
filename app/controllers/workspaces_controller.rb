class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]
  before_action :find_workspace, only: [:update, :destroy, :add_member]
  def index
    @workspaces = current_user.created_workspaces
    @memberworkspaces = current_user.workspaces
    render json: {
      created_workspaces: @workspaces.as_json(only: [:id, :name]),
      member_workspaces: @memberworkspaces.as_json(only: [:id, :name])
    }
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

  def add_member
    # byebug
    render json: { 
      success: true,
      email: params[:email]
    }
  end

  private
  def find_workspace
    # byebug
    @workspace = Workspace.find(params[:id] || params[:workspace_id])
  end

  def workspace_params
    params.require(:workspace).permit(:name)
  end

end