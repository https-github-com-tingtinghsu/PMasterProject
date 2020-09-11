class PostsController < ApplicationController
	before_action :find_item, only: [:index, :create, :update, :destroy]
	before_action :find_post, only: [:update, :destroy]
  def index
		@posts = @item.posts.all
		render json:{
			post: @post.as_json(only: [:id, :content]) 
		}
  end

  def create
    @post = @item.posts.new(content: params[:content])
    @post.save
    render json: { 
      success: @post.save,
      id: @post.id,
      content: @post.content
    }
  end
	def update
		@post.update(content: params[:content])
		render json: { 
      success: true
    }
	end
	def destroy
		@post.destroy
		render json: { 
      success: true
    }
	end
	private
  def find_item
    @item = Item.find(params[:id])
	end
	def find_post
		# @post = Item.find([:id])
	end
end
