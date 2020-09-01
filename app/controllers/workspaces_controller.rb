class WorkspacesController < ApplicationController
  def index
    @workspaces = Workspace.all
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
    @workspace = Workspace.find(params[:id])    
  end

  def update
    @workspace = Workspace.find(params[:id])

    if @workspace.update(workspace_params)
      redirect_to workspaces_path, notice: "更新成功"
    else
      render :edit
    end
  end

  def show
    @workspace = Workspace.find(params[:id])
  end

  private
  def workspace_params
    params.require(:workspace).permit(:name)
  end

end