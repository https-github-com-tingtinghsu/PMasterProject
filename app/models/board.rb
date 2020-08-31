class Board < ApplicationRecord
  # acts_as_list scope: :board
  belongs_to :workspace
  has_many :groups

  validates :id, presence: true
end
