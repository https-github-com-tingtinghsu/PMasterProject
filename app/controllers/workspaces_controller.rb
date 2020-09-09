class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy]
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
    @workspace.save
    @workspace.users = [current_user]
    #往後權限上線即可調整，創建者會塞給他manager權限
    room_create
    render json: { 
      success: @workspace.save,
      id: @workspace.id,
      name: @workspace.name
    }
  end

  def update  
    @workspace.update(name: params[:name])
    render json: { 
      success: true
    }    
  end

  def destroy
    @workspace.destroy
    render json: { 
      success: true
    }
  end

  def rooms
    @workspaces = current_user.workspaces
    # @workspaces = current_user.created_workspaces
    @workspace = @workspaces.find(params[:id])
    # byebug
    @room = @workspace.room
  end

  def room_create
    @room = @workspace.create_room(name:"工作聯絡室")
  end


  def add_member
    result = false
    message = "error"
    find_user = User.find_by(email: params[:email])
    if find_user.present? 
      result = true 
      @workspace.users << find_user
      message = "success"
    end
    render json: { 
      success: result,
      email: params[:email],
      message: message
    }
  end

  private
  def find_workspace
    @workspace = Workspace.find(params[:id] || params[:workspace_id])
  end

  def workspace_params
    params.require(:workspace).permit(:name, :user_id)
  end

  

end