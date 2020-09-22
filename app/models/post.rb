class Post < ApplicationRecord
  belongs_to :item
  belongs_to :user
  has_many :replies
  has_many :post_likes

  # validates :content, presence: true
end
