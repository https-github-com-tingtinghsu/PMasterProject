class AddPointToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :point, :float        
  end
end
