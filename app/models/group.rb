class Group < ApplicationRecord
  belongs_to :board
  has_many :items, dependent: :destroy

  validates :name, presence: true

  def has_chart?
    return false if items.size == 0
    # 有item, 而且每個item要有point, 才能畫圖
    items.all? { |item| item.point.present? }
  end
end
