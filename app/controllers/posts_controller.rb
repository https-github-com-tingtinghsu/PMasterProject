class PostsController < ApplicationController
	before_action :find_item, only: [:create, :update]
	before_action :authenticate_user!

  def create
		@post = @item.posts.new(content: params[:postcontent])
		@post.user_id = current_user.id
		@post.save
		flash.notice = "留言成功"
  end
	
	def update
		@post.update(content: params[:content])
	end
	
	def destroy
		@post = Post.find(params[:id])
		@post.destroy
	end
	
	private
  	def find_item
    	@item = Item.find(params[:item_id])
		end
end
