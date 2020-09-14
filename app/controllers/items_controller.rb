class ItemsController < ApplicationController
	before_action :find_board_and_group, only: [:index, :new, :create]
	before_action :find_item, only: [:edit, :update, :destroy]

	def index
		@items = @group.items.all
		# byebug
	end

	def new
		@item = Item.new
		@workspace_users = Workspace.find_by(id: @board.workspace_id).users
	end

	def create
		@item = @group.items.new(item_params)
		@member_id = params[:person].values
		# 撈出被選取到的user_id
		if @item.save
			byebug
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
		if @item.update(item_params)
			board =	Board.find(Group.find(@item.group_id).board_id)
			# 先找到該item隸屬的group，再找該group隸屬的board，以便儲存後轉址到 boards/id/groups
			redirect_to board_groups_path(board)
		else
			render :edit
		end
		# byebug
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