class CreateGitUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :git_users do |t|
      t.references :user, null: false, foreign_key: true
      t.text :repository
      t.text :org

      t.timestamps
    end
  end
end
