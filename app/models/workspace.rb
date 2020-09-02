class Workspace < ApplicationRecord
  has_many :workspace_users
  has_many :members, through: :workspace_users 
  
  belongs_to :creator, foreign_key: :user_id, class_name: 'User'
  has_many :boards, -> { order(position: :asc) }

  validates :name, presence: true
  default_scope { order(id: :asc) }

end
