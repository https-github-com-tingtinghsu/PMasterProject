class Workspace < ApplicationRecord
  has_many :workspace_users
  has_many :users, through: :workspace_users
end
