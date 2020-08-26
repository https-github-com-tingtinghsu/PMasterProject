class Board < ApplicationRecord
  belongs_to :workspace
  has_many :groups
end
