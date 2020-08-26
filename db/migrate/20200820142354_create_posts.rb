class CreatePosts < ActiveRecord::Migration[6.0]
  def change
    create_table :posts do |t|
      t.text :content
      t.belongs_to :item, null: false, foreign_key: true

      t.timestamps
    end
  end
end
