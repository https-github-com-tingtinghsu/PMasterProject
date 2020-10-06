class Group < ApplicationRecord
  include Chart
  extend FriendlyId

  friendly_id :slug, use: :slugged

  belongs_to :board
  has_many :items, dependent: :destroy

  # create instance前給slug值，做unique網址
  before_create { self.slug = SecureRandom.uuid }

  validates :name, presence: true

  def has_chart?
    # 沒有items或開始,結束時間, 直接return
    return false if items.size == 0 || start_date == nil || end_date == nil
    # 有item, 而且每個item要有point, 才能畫圖
    items.all? { |item| item.point.present? }
  end

end
