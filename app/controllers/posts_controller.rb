class PostsController < ApplicationController
	before_action :find_item, only: [:create, :update]
	before_action :find_post, only: [:destroy, :likes,:replies]
	before_action :find_current_user, only: [:likes,:replies]
	before_action :authenticate_user!

  def create
		@post = @item.posts.new(content: params[:postcontent])
		@post.user_id = current_user.id
		@post.save
  end
	
	def update
		@post.update(content: params[:content])
	end
	
	def destroy
		@item = Item.find(@post.item_id)
		@post.destroy
	end

	def likes
		current_user.toggle_likes_post(@post)
		# 判斷當前使用者是否按過該篇文章的讚
	end

	def replies
		@replies = @post.replies.order(created_at: :desc).limit(50)
	end
	
	private
	
		def find_current_user
			@current_user = User.find(current_user.id)		
		end

		def find_post
			@post = Post.find(params[:id])
		end

  	def find_item
    	@item = Item.find(params[:item_id])
		end

end
