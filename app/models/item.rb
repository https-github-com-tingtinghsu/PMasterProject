class Item < ApplicationRecord
  belongs_to :group
  has_many :posts, dependent: :destroy
  
  has_many :assignments, dependent: :destroy
  has_many :users, through: :assignments 

  before_update :update_finish_date

  # validates :name, presence: true

  # 更新下拉選單時，也須確認資料庫裡的完成日期是否需要更改
  def update_finish_date
    self.finish_date = (status == "已完成") ? Time.now.strftime('%F') :  ""
  end

  # class method: 作用在一群item上
  # 把item裡，同一user的point加總
  def self.get_point_by_user_id(user_id)
    select{|item| item.users.map(&:id).include?(user_id)}.inject(0){|sum, item| sum + item.point}
  end

  # instance method: item的到期日可能為group預設到期日或手動設置
  def deadline_date
    due_date || group.end_date
  end

  def expected_spend_day
    (deadline_date.to_date - group.start_date.to_date).to_i
  end

  def actual_spend_day
    if finish_date?
      (finish_date.to_date - group.start_date.to_date).to_i
    else
      0
    end
  end
end
