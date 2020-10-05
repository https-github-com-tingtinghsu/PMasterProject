class Item < ApplicationRecord
  belongs_to :group
  has_many :posts, dependent: :destroy
  
  has_many :assignments, dependent: :destroy
  has_many :users, through: :assignments 

  # validates :name, presence: true, length: {maximum:20}


  # 把item裡，同一user的point加總
  def self.get_point_by_user_id(user_id)
    select{|item| item.users.map(&:id).include?(user_id)}.inject(0){|sum, item| sum + item.point}
  end
end
