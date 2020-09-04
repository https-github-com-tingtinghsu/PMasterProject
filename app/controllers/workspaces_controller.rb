class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  before_action :find_workspace, only: [:show, :edit, :update, :destroy]
  def index
    @workspaces = current_user.workspaces.all
  end

  def show
    @boards = @workspace.boards
  end  

  def new
    @workspace = Workspace.new
  end

  def create
    @workspace = current_user.workspaces.new(workspace_params)
    @workspace.workspace_users << WorkspaceUser.new(user: current_user, role: 'manager')
    # 當這個版寫入成功時，把目前使用者也加入到workspace_users，並且在成功存檔時，一同寫入
    if @workspace.save
      # WorkspaceUser.create(workspace: @workspace, user: current_user, role: 'manager')
      # 若有心要在建立版時，刻意寫2個creator，那就會在存檔時爆炸
      redirect_to workspaces_path, notice: '新增成功！'
    else
      render :new
    end
  end

  def edit    
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
    authorize @workspace, :destroy
    redirect_to workspaces_path, notice: "工作區刪除成功！"
  end

  private
  def find_workspace
    @workspace = Workspace.find(params[:id])
  end

  def workspace_params
    params.require(:workspace).permit(:name)
          .merge(user_id: current_user.id)
  end

end