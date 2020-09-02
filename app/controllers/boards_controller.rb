class BoardsController < ApplicationController
  def show
    @board = Board.find(params[:id])
    @workspace = @board.workspace
  end
end