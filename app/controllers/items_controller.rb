class ItemsController < ApplicationController
	before_action :find_board_and_group, only: [:index, :new, :create]
	before_action :find_item, only: [:edit, :update, :posts,:destroy]

	def index
		@items = @group.items.all
	end

	def new
		@item = Item.new
		@workspace_users = Workspace.find_by(id: @board.workspace_id).users
	end

	def create
		@item = @group.items.new(item_params)
		# 撈出被選取到的user_id
		if @item.save
			if (params[:person])
				@members_id = params[:person].values
				@members_id.each do |m|
					@item.users << User.find(m.to_i)
				end
			end
			redirect_to board_groups_path(@group.board_id), notice: "新增成功"
			# 新增function連動github issuse
		else
			render :new
		end
	end

	def edit
		@group = Group.find(@item.group_id)
		@board = Board.find(@group.board_id)
		@workspace_users = Workspace.find_by(id: @board.workspace_id).users
	end

	def update
		@item.users.delete_all
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

		def find_board_and_group
			@group = Group.find(params[:group_id])
			@board = @group.board
		end

		def item_params
			params.require(:item).permit(:name, :description, :status, :person, :due_date)
		end
end