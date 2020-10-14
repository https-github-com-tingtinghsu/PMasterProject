require "github.rb"

class RepositoriesController < ApplicationController

    def index
        # 判斷是否越獄 是的話導走
        begin
            @user = Gittoke.where("user_id = #{current_user.id}")
        rescue
            redirect_to "/dashboard"
        end
        
        @repository = Github.new.getuserrepository(@user.token)

        begin
            @nowrepository = GitUser.where("user_id = #{current_user.id}")
        rescue
            @nowrepository = GitUser.new
            @nowrepository.repository = "無設定"
        end
    end

    def create

        begin
            @user = GitUser.where("user_id = #{params[:id]}")

            @user.repository = params[:repository]
            @user.org = params[:org]

            @user.save
        rescue
            @createuser = GitUser.new

            @createuser.user_id = params[:id]
            @createuser.repository = params[:repository]
            @createuser.org = params[:org]

            @createuser.save
        end 
    end
    
end
