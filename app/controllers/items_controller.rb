require "github.rb"
class ItemsController < ApplicationController
	before_action :find_board_and_group, only: [:index, :new, :create]
	before_action :find_item, only: [:edit, :update, :posts,:destroy, :update_finish_date]
	before_action :find_item_user_id, only: [:edit, :update, :posts,:destroy]

	def index
		@items = @group.items.all
	end

	def new
		@item = Item.new
		@workspace_users = @board.workspace.users.to_a << @board.workspace.creator
		# assignment對象是所有在這個workspace裡面的人，所以要抓 users、creator
		# 但這樣是重複進資料庫撈資料
	end

	def create
		@item = @group.items.new(item_params)
		# description
		# 撈出被選取到的user_id
		@item.finish_date = (item_params[:status] == "已完成") ? Time.now.strftime('%F') :  ""
		if @item.save
			if (params[:person])
				@members_id = params[:person].values
				@members_id.each do |m|
					@item.users << User.find(m.to_i)
				end
			end
			if params[:person] != nil
				ActionCable.server.broadcast("user_channel_#{params[:person].values[0]}","你有新的 Issue 通知 【 #{@item.name} 】")
			end
			board =	Board.find(Group.find(@item.group_id).board_id)
			ActionCable.server.broadcast("board_channel_#{ board.id }", "")
			# puts "開始寫入Github Issue:"
			Github.new.issueCreate(@item.name, session[:user])
			# puts "成功寫入!"
			redirect_to board_groups_path(@group.board_id), notice: "新增成功"
		else
			render :new
		end
	end

	def edit
		@group = Group.find(@item.group_id)
		@board = Board.find(@group.board_id)
		@workspace_users = @board.workspace.users.to_a << @board.workspace.creator
		# p @workspace_users.map{ |u| [u.id, u.email] 
	end

	def update
		# 如果狀態被選取為「已完成」,系統就自動更新完成日為Time.now, 否則清空完成日
		params[:item]["finish_date"] = (item_params[:status] == "已完成") ? Time.now.strftime('%F') :  ""

		if @item.update(item_params)
			if (params[:person])
				@members_id = params[:person].values
				@members_id.each do |m|
					@item.users << User.find(m.to_i)
				end
			end

			board =	Board.find(Group.find(@item.group_id).board_id)
			# 先找到該item隸屬的group，再找該group隸屬的board，以便儲存後轉址到 boards/id/groups
			redirect_to board_groups_path(board)
		else
			render :edit
		end
		# byebug
	end

	def posts
		@posts = @item.posts.order(created_at: :desc).limit(50)
		@current_user = User.find(current_user.id)
		# puts "========================post======================"
		# puts params[:id]
		@params_id = params[:id]
		# ActionCable.server.broadcast("post_channel",@params_id)
	end

	def destroy
		@item.destroy
		board =	Board.find(Group.find(@item.group_id).board_id)
		# 2020/09/27 Wei
		# puts "================board.id==================="
		ActionCable.server.broadcast("board_channel_#{ board.id }", "")
		redirect_to board_groups_path(board), notice: "刪除成功"
	end

	private

		def find_item
			@item = Item.find(params[:id])
		end

		def find_item_user_id
			@item_user_ids = @item.users.map(&:id)			
		end

		def find_board_and_group
			@group = Group.find(params[:group_id])
			@board = @group.board
		end

		def item_params
			params.require(:item).permit(:name, :description, :point, :status, :person, :finish_date, :due_date, user_ids: []).tap do |whitelist|
				whitelist[:user_ids] = whitelist[:user_ids].reject(&:blank?)
				# filter的相反：滿足這個條件的就reject, 不要存空白進去
			end
		end
end