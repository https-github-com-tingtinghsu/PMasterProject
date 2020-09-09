class HomeController < ApplicationController
  before_action :authenticate_user!, only: [:dashboard]
  
  def index
    if current_user
      redirect_to dashboard_path

    end
  end

  def dashboard
    # 有cookies的人才需要confirmed_invitation
    confirmed_invitation if cookies[:user_token]

  end

  private
  def confirmed_invitation
    confirmed_invitation = Invitation.find_by(token: cookies[:user_token])
    if current_user 
      # 排除了「如果已經透過同一個token被加入工作區，就不要再重複加同一個user進去」的狀況
      if confirmed_invitation.workspace.users.where(id: current_user.id).size == 0
        confirmed_invitation.receive_user_id = current_user.id
        confirmed_invitation.workspace.users << current_user
        flash[:add_board_notice] = "成功加入#{@confirmed_invitation.workspace.name}看板！"
      end
    end    
  end

end