class CreateItems < ActiveRecord::Migration[6.0]
  def change
    create_table :items do |t|
      t.string :name
      t.string :description
      t.string :person
      t.string :status
      t.date :due_date
      t.string :tages
      t.belongs_to :group, null: false, foreign_key: true

      t.timestamps
    end
  end
end
