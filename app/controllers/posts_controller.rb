class PostsController < ApplicationController
	before_action :find_item, only: [:create, :update]
	before_action :find_post, only: [:destroy, :likes]
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
		@post.destroy
	end

	def likes
		current_user.toggle_likes_post(@post)
		# 判斷當前使用者是否按過該篇文章的讚
		@current_user = User.find(current_user.id)
		# 實體變數是為了可以傳進js.erb使用
	end

	private

	def find_post
		@post = Post.find(params[:id])
	end

  	def find_item
    	@item = Item.find(params[:item_id])
	end

end
