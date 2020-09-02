class Item < ApplicationRecord
  belongs_to :group
  has_many :posts

  has_many :assignments
  has_many :users, through: :assignments 
end
