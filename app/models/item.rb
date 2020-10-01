class Item < ApplicationRecord
  belongs_to :group
  has_many :posts, dependent: :destroy
  
  has_many :assignments, dependent: :destroy
  has_many :users, through: :assignments 

  # validates :name, presence: true
  
end
