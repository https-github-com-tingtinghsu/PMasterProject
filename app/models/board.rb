class Board < ApplicationRecord
  # acts_as_list scope: :board
  extend FriendlyId
  friendly_id :name, use: :slugged  
  belongs_to :workspace
  has_many :groups, dependent: :destroy

  # create instance前給slug值，做unique網址
  before_create { self.slug = SecureRandom.uuid }

  validates :name, presence: true
  default_scope { order(id: :desc) }  
end
