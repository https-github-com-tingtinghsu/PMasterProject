require "github.rb"

class GithubsController < ApplicationController
    def index
        # redirect_to "https://github.com/login/oauth/authorize?client_id=#{ENV["gitclientid"]}&=http://localhost:3000/oauth/redirect&scope=repo"

        access_token = Github.new.gettoken(params["code"])

        # DB
        puts "這是寫入 User:"
        puts current_user.id

        begin
            @user = Gittoke.where("user_id = ?", current_user.id)

            if @user.token != access_token
                @user.token = access_token

                @user.save
            end
            puts "find user"
        rescue
            @user = Gittoke.new
            @user.token = access_token
            @user.user_id = current_user.id

            @user.save
            puts "not find"
        end
      

        # for test
		puts "這是寫入 Session:"
        session[:user] = access_token
        puts "這是session[:user] 當前的值："
        puts session[:user]

        @checkOA = true
        redirect_to "/dashboard"
    end
end