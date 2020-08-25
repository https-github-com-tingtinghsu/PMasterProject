class AddUserIdToWorkspace < ActiveRecord::Migration[6.0]
  def change
    add_reference :workspaces, :user, null: true, foreign_key: true
  end
end
