class BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @workspace = @board.workspace
  end

  def edit
    @board = Board.find(params[:id])    
  end
end