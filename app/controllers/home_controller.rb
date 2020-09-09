class HomeController < ApplicationController
  before_action :authenticate_user!, only: [:dashboard]
  
  def index
    if current_user
      redirect_to dashboard_path
    # else
    # #   redirect_to root_path
    end
  end

  def dashboard
    # if (cookies[:user_token] && current_user)
    #   confirmed_invitation = Invitation.find_by(token: cookies[:user_token])
    #   confirmed_invitation.receive_user_id = current_user.id
    #   confirmed_invitation.workspace.users << current_user
    #   confirmed_invitation.workspace_id
    #   flash[:add_board_notice] = "成功加入#{confirmed_invitation.workspace_id}看板"
    # end
  end
end