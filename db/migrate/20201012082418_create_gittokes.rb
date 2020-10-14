class CreateGittokes < ActiveRecord::Migration[6.0]
  def change
    create_table :gittokes do |t|
      t.text :token
      t.references :user, null: false, foreign_key: true

      t.timestamps
    end
  end
end
