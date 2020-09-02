class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_workspace, only: [:show, :edit, :update, :destroy]
  def index
    @workspaces = current_user.workspaces.all
  end

  def show
  end  

  def new
    @workspace = Workspace.new
  end

  def create
    @workspace = current_user.workspaces.new(workspace_params)
    if @workspace.save
      redirect_to workspaces_path, notice: '新增成功！'
    else
      render :new
    end
  end

  def edit    
  end

  def update  
    if @workspace.update(workspace_params)
      redirect_to workspaces_path, notice: "更新成功"
    else
      render :edit
    end
  end

  def destroy
    @workspace.destroy
    redirect_to workspaces_path, notice: "工作區刪除成功！"
  end

  private
  def find_workspace
    @workspace = Workspace.find(params[:id])
  end

  def workspace_params
    params.require(:workspace).permit(:name)
  end

end