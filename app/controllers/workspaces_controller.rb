require 'securerandom'

class WorkspacesController < ApplicationController
  before_action :authenticate_user!
  skip_before_action :verify_authenticity_token, only: [:create, :update, :destroy, :add_member]
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

  def add_member
    result = false
    message = "error"
    receive_user = params[:receive_user_email]
    find_user = User.find_by(email: receive_user)
    uuid = SecureRandom.uuid 
    if find_user.present? 
      result = true
      # @workspace.users << find_user

      message = "success"
      UserMailer.invite_member(current_user.email, receive_user, @workspace, uuid).deliver_now!
    else
      result = true 
      message = "success"
      UserMailer.invite_member(current_user.email, receive_user, @workspace, uuid).deliver_now!
    end
    render json: { 
      success: result,
      email: receive_user,
      message: message,
      uuid: uuid
    }
  end

  private
  
  # def generate_uuid
  #   uuid = SecureRandom.uuid
  # end

  def find_workspace
    @workspace = Workspace.find(params[:id] || params[:workspace_id])
  end

  def workspace_params
    params.require(:workspace).permit(:name)
  end

end