class Item < ApplicationRecord
  belongs_to :group
  has_many :posts, dependent: :destroy
  
  has_many :assignments, dependent: :destroy
  has_many :users, through: :assignments 

  # validates :name, presence: true

  # class method: 作用在一群item上
  # 把item裡，同一user的point加總
  def self.get_point_by_user_id(user_id)
    select{|item| item.users.map(&:id).include?(user_id)}.inject(0){|sum, item| sum + item.point}
  end

  # instance method: item的到期日
  def deadline_date
    due_date || group.end_date
  end

  def expected_spend_day
    (deadline_date.to_date - group.start_date.to_date).to_i
  end
end
