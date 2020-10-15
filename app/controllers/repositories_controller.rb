require "github.rb"

class RepositoriesController < ApplicationController

    def index
        # 判斷是否越獄 是的話導走

        # @user = Gittoke.where("user_id = ?", current_user.id).pluck(:user_id, :token)
        @user = Gittoke.find_by("user_id = ?", current_user.id)

        if @user == nil
            redirect_to "/dashboard"    
        end
        
        @repository = Github.new.getuserrepository(@user.token)


        @nowrepository = GitUser.find_by("user_id = ?", current_user.id)

        if @nowrepository == nil
            @nowrepository = GitUser.new
            @nowrepository.repository = "無設定"
        end

    end

    def create

        @user = GitUser.find_by("user_id = ?", params[:id])
        if @user != nil
            @user.repository = params[:repository]
            @user.org = params[:org]

            @user.save
        else
            @createuser = GitUser.new

            @createuser.user_id = params[:id]
            @createuser.repository = params[:repository]
            @createuser.org = params[:org]

            @createuser.save
        end
    end
    
end
