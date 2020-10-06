require 'securerandom'

require 'date'
class GroupsController < ApplicationController
  before_action :find_board, only: [:index, :create]
  before_action :find_group, only: [:edit, :update, :destroy, :charts, :chart_date_array]
  def index
    @groups = @board.groups.all.order(created_at: :desc)
    @workspace = @board.workspace_id
    @rooms = Room.all
    @room = @rooms.find_by(workspace_id: @workspace)
    @items = Item.all.order(created_at: :desc)
    @posts = Post.all
    @assignments = Assignment.all
    @workspace_find_user = @board.workspace
    @find_users = @workspace_find_user.users
    @online_users = @find_users.where("last_seen_at > ?", 2.minutes.ago)
    @workspace_name = @board.workspace.name
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

  def edit
  end

  def update
    
    if @group.update(group_params)
      redirect_to board_groups_path(@group.board), notice: "修改成功"
    else
      render :edit
    end
  end

  def charts
    # 理想的線圖
    gon.avg_point_array = @group.avg_point_array
    # 每個item會有完成的時間, 算出每一天完成的points
    gon.point_array = @group.point_array
    gon.date_array = @group.start_end_date_array

    # 圓餅圖
    gon.member_array = @group.find_all_members_name
    gon.member_point_array = @group.find_all_members_point_array

    # 長條圖
    gon.item_array = @group.find_items_array
    gon.item_expected_days_array = @group.find_items_expected_spend_day_array
    gon.item_actual_days_array = @group.find_items_actual_spend_day_array
  end

  def destroy
    @group.destroy
    redirect_to board_groups_path(@group.board), notice: "刪除成功"
  end

  private

  def find_board
    @board = Board.friendly.find(params[:board_id])
  end
  def find_group
    @group = Group.find(params[:id])
  end
  def group_params
    params.require(:group).permit(:name, :start_date, :end_date)
  end
end