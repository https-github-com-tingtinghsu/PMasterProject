class RepliesController < ApplicationController
  before_action :find_post, only: [:create, :destroy]
  before_action :find_reply, only: [:update]
  
  def create
    @reply = @post.replies.new(content: params[:replycontent])
		@reply.user_id = current_user.id
    @reply.save
    
		ActionCable.server.broadcast("reply_channel",postid: params[:post_id],replycount: @post.replies.count,replycontent: params[:replycontent],username: current_user.display_name)
  end
  
  def destroy
    @reply.destroy
  end
  
  private
  def find_post
    @post = Post.find(params[:post_id])
  end

  def find_reply
  end

end