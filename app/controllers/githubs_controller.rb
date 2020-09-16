require "github.rb"

class GithubsController < ApplicationController
    def index
        # redirect_to "https://github.com/login/oauth/authorize?client_id=#{ENV["gitclientid"]}&=http://localhost:3000/oauth/redirect&scope=repo"

        access_token = Github.new.gettoken(params["code"])

        # for test
		# puts "這是寫入 Session:"
        # session[:user] = access_token
        # puts "這是session[:user] 當前的值："
        # puts session[:user]
        
        redirect_to "/dashboard"
    end
end