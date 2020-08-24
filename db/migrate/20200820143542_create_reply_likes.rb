class CreateReplyLikes < ActiveRecord::Migration[6.0]
  def change
    create_table :reply_likes do |t|
      t.belongs_to :reply, null: false, foreign_key: true

      t.timestamps
    end
  end
end
