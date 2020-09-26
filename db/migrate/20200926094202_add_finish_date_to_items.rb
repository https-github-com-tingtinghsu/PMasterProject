class AddFinishDateToItems < ActiveRecord::Migration[6.0]
  def change
    add_column :items, :finish_date, :date        
  end
end
