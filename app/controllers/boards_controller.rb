class BoardsController < ApplicationController
  before_action :find_workspace, only: [:index, :new, :create]
  skip_before_action :verify_authenticity_token, only: [:create, :destroy]  
  before_action :find_board, only: [:show, :edit, :update, :destroy]

  def index
    @boards = @workspace.boards
    render json: {
      created_boards: @boards.as_json(only: [:id, :name])
      # http://localhost:3333/workspaces/18/boards/
      # member_workspaces: @memberworkspaces.as_json(only: [:id, :name])
    }    
  end
  def show
  end

  def new
    @board = @workspace.boards.new
  end

  def create
    @board = @workspace.boards.new(name: params[:name])
    # if @board.save
    #   redirect_to workspace_path(@workspace), notice: '新增成功！'
    # else
    #   render :new
    # end
    render json: { 
      success: @board.save,
      id: @board.id,
      name: @board.name
    }
  end

  def edit
  end

  def update   
    if @board.update(board_params)
      redirect_to workspace_path(@board.workspace), notice: "更新看板區成功"
    else
      render :edit
    end
  end

  def destroy
    @board.destroy
    render json: { 
      success: true
    }
  end

  private
  def find_workspace
    @workspace = Workspace.find(params[:workspace_id]) 
  end

  def find_board
    @board = Board.find(params[:id])    
  end

  def board_params
    params.require(:board).permit(:name)
  end
end