class CreateWorkspaceUsers < ActiveRecord::Migration[6.0]
  def change
    create_table :workspace_users do |t|
      t.belongs_to :user, null: false, foreign_key: true
      t.belongs_to :workspace, null: false, foreign_key: true

      t.timestamps
    end
  end
end
