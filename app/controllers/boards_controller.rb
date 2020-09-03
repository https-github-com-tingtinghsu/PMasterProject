class BoardsController < ApplicationController
  before_action :find_board, only: [:show, :edit, :update, :destroy]  
  def show
    @workspace = @board.workspace
  end

  def edit
  end

  def new
    @board = Board.new
  end

  def create
    @workspace = current_user.created_workspaces.find_by(params[:id])
    @board = @workspace.boards.new(board_params)
    if @board.save
      redirect_to workspace_path(@workspace), notice: '新增成功！'
    else
      render :new
    end
  end

  def update  
    if @board.update(board_params)
      redirect_to workspace_path(@board.workspace), notice: "更新看板區成功"
    else
      render :edit
    end
  end

  def destroy
    workspace_id = @board.workspace.id
    @board.destroy
    redirect_to workspace_path(workspace_id), notice: "看板區刪除成功！"
  end

  private
  def find_board
    @board = Board.find(params[:id]) 
  end

  def board_params
    params.require(:board).permit(:name)
  end
end