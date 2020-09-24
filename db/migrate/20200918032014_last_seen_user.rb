class LastSeenUser < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :last_seen_at, :datetime
  end
end
