class Workspace < ApplicationRecord
  has_many :workspace_users
  has_many :users, through: :workspace_users 
  
  belongs_to :creator, foreign_key: :user_id, class_name: 'User'
  has_many :boards, -> { order(position: :asc) }

  validates :id, presence: true
end
