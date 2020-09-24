require "github.rb"
class ItemsController < ApplicationController
	before_action :find_board_and_group, only: [:index, :new, :create]
	before_action :find_item, only: [:edit, :update, :posts,:destroy]
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
		# 新增function連動github issuse
		# if(session[:user].nil?)
		# 	redirect_to "https://github.com/login/oauth/authorize?client_id=#{ENV["gitclientid"]}&=http://localhost:3333/oauth/redirect&scope=repo"
		# end
		@item = @group.items.new(item_params)
		# 撈出被選取到的user_id
		if @item.save
			if (params[:person])
				@members_id = params[:person].values
				@members_id.each do |m|
					@item.users << User.find(m.to_i)
				end
			end

			puts "開始寫入Github Issue:"
			Github.new.issueCreate(@item.name, session[:user])
			puts "成功寫入!"
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
	end

	def destroy
		@item.destroy
		board =	Board.find(Group.find(@item.group_id).board_id)
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
			params.require(:item).permit(:name, :description, :status, :person, :due_date, user_ids: []).tap do |whitelist|
				whitelist[:user_ids] = whitelist[:user_ids].reject(&:blank?)
				# filter的相反：滿足這個條件的就reject, 不要存空白進去
			end
		end
end