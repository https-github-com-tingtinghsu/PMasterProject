class AddPositionToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :position, :integer
  end
end
