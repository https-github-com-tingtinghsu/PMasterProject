class RepliesController < ApplicationController
  before_action :find_post, only: [:create, :destroy]
  before_action :find_reply, only: [:update]
  
  def create
    @reply = @post.replies.new(content: params[:replycontent])
		@reply.user_id = current_user.id
		@reply.save
  end
  
  def destroy
    @reply.destroy
  end
  
  private
  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_reply
    # @reply = Reply.find_by(params[:id])...
  end

end