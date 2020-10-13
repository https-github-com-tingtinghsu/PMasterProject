require "github.rb"

class RepositoriesController < ApplicationController

    def index
        # 判斷是否越獄 是的話導走
        begin
            @user = Gittoke.find(current_user.id )
        rescue
            redirect_to "/dashboard"
        end
        
        @repository = Github.new.getuserrepository(@user.token)
    end

    def create

        begin
            @user = GitUser.find( params[:id] )

            @user.repository = params[:repository]
            @user.org = params[:org]
        rescue
            @createuser = GitUser.new

            @createuser.user_id = params[:id]
            @createuser.repository = params[:repository]
            @createuser.org = params[:org]

            @createuser.save
        end 
    end
    
end
