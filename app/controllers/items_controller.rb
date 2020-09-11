class ItemsController < ApplicationController
	before_action :find_board_and_group, only: [:index, :create]
	before_action :find_item, only: [:edit, :update, :destroy]

	def index
		@items = @group.items.all 
	end
	def new
		@item = Item.new
	end
	def create
		@item = @group.items.new(item_params)
		if @item.save
			redirect_to group_items_path, notice: "新增成功"
			# 新增function連動github issuse
		else
			render :new
		end
	end
	def edit
	end
	def update
		if @item.update(item_params)
			redirect_to group_items_path(@item.group)
		else
			render :edit
		end
	end
	def destroy
		@item.destroy
		redirect_to group_items_path(@item.group), notice: "刪除成功"
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
		# byebug
		params.require(:item).permit(:name, :description, :status, :person, :due_date)
	end
end