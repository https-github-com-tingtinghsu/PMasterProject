class CreatePostLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :post_likes do |t|
      t.belongs_to :post, null: false, foreign_key: true

      t.timestamps
    end
  end
end
