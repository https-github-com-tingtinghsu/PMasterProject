class CreateBoards < ActiveRecord::Migration[6.0]
  def change
    create_table :boards do |t|
      t.string :name
      t.string :description
      t.belongs_to :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
