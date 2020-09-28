class AddStartDateEndDateToGroups < ActiveRecord::Migration[6.0]
  def change
    add_column :groups, :start_date, :datetime
    add_column :groups, :end_date, :datetime          
  end
end
