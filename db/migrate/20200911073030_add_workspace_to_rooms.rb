class AddWorkspaceToRooms < ActiveRecord::Migration[6.0]
  def change
    add_reference :rooms, :workspace, null: false, foreign_key: true
  end
end
