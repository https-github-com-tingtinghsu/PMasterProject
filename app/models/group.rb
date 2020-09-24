class Group < ApplicationRecord
  belongs_to :board
  has_many :items, dependent: :destroy

  validates :name, presence: true
end
