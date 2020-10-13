require "github.rb"

class RepositoriesController < ApplicationController

    def index
        # 判斷是否越獄 是的話導走
        begin
            @user = Gittoke.find( current_user.id )
        rescue
            redirect_to "/dashboard"
        end

        @repository = Github.new.getuserrepository(@user.token)
        # puts @repository
        # render json: @repository
    end

    def create
    end
    
end
