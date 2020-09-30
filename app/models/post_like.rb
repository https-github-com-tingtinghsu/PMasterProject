class PostLike < ApplicationRecord
  belongs_to :post
  belongs_to :user
  validates_uniqueness_of :user_id, :scope => :post_id

  scope :count_like, ->(p) { where(["post_id = ?", p]).count() }
end
