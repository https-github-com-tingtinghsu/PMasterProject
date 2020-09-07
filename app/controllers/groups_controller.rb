class GroupsController < ApplicationController
  def index
    @board = Board.find(params[:board_id])
  end
end