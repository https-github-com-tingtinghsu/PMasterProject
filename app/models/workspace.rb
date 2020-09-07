class Workspace < ApplicationRecord
  acts_as_paranoid
  has_many :workspace_users
  has_many :users, through: :workspace_users 
  # has_many :members, through: :workspace_users 
  
  belongs_to :creator, foreign_key: :user_id, class_name: 'User'
  has_many :boards, -> { order(position: :asc) }, dependent: :destroy

  validates :name, presence: true
  default_scope { order(id: :asc) }

  # has_one :room

end
