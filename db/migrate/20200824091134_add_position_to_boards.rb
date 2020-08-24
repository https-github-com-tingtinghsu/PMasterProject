class AddPositionToBoards < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :position, :integer
  end
end
