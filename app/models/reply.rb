class Reply < ApplicationRecord
  belongs_to :post
  belongs_to :user
  has_many :reply_likes
end
