class AddSlugToBoards < ActiveRecord::Migration[6.0]
  def change
    add_column :boards, :slug, :string
    add_index :boards, :slug, unique: true
  end
end
