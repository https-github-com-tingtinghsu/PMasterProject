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
    @workspace.save
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
    find_user = User.find_by(email: params[:receive_user_email])

    invitation = current_user.invitations.new
    invitation.token = SecureRandom.uuid
    invitation.workspace_id = @workspace.id
    invitation.receive_user_email = params[:receive_user_email]
    invitation.receive_user_id = nil
    invitation.save
    #invitation.errors
    if find_user.present? 
      result = true
      # @workspace.users << find_user

      message = "success"
      UserMailer.invite_member(invitation).deliver_now!
    else
      result = true 
      message = "success"
      UserMailer.invite_new(invitation).deliver_now!
    end
    render json: { 
      success: result,
      email: invitation.receive_user_email,
      message: message,
      uuid: invitation.token
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
    params.require(:workspace).permit(:name, :user_id)
  end

  

end