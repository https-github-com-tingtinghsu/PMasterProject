class CreateInvitations < ActiveRecord::Migration[6.0]
  def change
    create_table :invitations do |t|
      t.string :token, null: false
      t.references :workspace, null: false, foreign_key: true
      t.references :user, null: false, foreign_key: true
      t.string :receive_user_email, null: false
      t.integer :receive_user_id, null: true

      t.timestamps
    end
  end
end
