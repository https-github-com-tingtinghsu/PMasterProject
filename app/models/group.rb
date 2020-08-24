class Group < ApplicationRecord
  belongs_to :board
  has_many :items
end
