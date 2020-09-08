class GroupsController < ApplicationController
  before_action :find_board, only: [:index, :create]
  def index
    @board = Board.find(params[:board_id])
    @groups = @board.groups.all
  end
  def new
    @group = Group.new
  end
  def create
    @group = @board.groups.new(group_params)
    if @group.save
      redirect_to board_groups_path, notice: "新增成功"
    else
      render :new
    end    
  end
  private
  def find_board
    @board = Board.find(params[:board_id])
  end
  def group_params
    params.require(:group).permit(:name)
  end
end