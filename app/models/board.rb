class Board < ApplicationRecord
  # acts_as_list scope: :board
  belongs_to :workspace
  has_many :groups, dependent: :destroy

  validates :name, presence: true
  default_scope { order(id: :desc) }  
end
