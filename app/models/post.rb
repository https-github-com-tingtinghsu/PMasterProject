class Post < ApplicationRecord
  belongs_to :item
  belongs_to :user
  has_many :replies, dependent: :destroy
  has_many :post_likes, dependent: :destroy
  has_many :liked_by_users, through: :post_likes, source: :user
  validates :content, presence: true

  scope :count_post, ->(p) { where(["item_id = ?", p]).count() }

  def liked_by?(u)
    liked_by_users.include?(u)
    # 該留言的喜歡者有沒有你
  end
end
