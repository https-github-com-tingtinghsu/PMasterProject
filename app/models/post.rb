class Post < ApplicationRecord
  belongs_to :item
  belongs_to :user
  has_many :replies
  has_many :post_likes, dependent: :destroy
  has_many :liked_by_users, through: :post_likes, source: :user
  # validates :content, presence: true

  def liked_by?(u)
    liked_by_users.include?(u)
    # 該留言的喜歡者有沒有你
  end
end
