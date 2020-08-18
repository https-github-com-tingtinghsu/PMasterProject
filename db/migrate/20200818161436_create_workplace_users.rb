class CreateWorkplaceUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :workplace_users do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :workplace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
