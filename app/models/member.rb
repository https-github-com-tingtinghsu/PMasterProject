class Member < User
  has_many :workspace_users, foreign_key: :user_id
  has_many :workspaces, through: :workspace_users
end