class Group < ApplicationRecord
  belongs_to :board
  has_many :items, dependent: :destroy

  validates :name, presence: true

  def has_chart?
    # 沒有items或開始,結束時間, 直接return
    return false if items.size == 0 || start_date == nil || end_date == nil
    # 有item, 而且每個item要有point, 才能畫圖
    items.all? { |item| item.point.present? }
  end

  def start_end_date_array
    #  group的第一天到最後一天
    (start_date.to_date..end_date.to_date).map {|date| date.strftime("%m/%d")}
  end

  # 回傳對應日期的加總point陣列
  def point_array
    (start_date.to_date..end_date.to_date).map {|date| count_date_point(date)}
  end

  # 理想的line
  def avg_point_array
    total_day = (end_date.to_date  - start_date.to_date).to_i
    avg_day_point = total_point / total_day
    # 每天減一份平均值，減到只剩0為止
    total_point.step(0 ,-avg_day_point).to_a
  end

  # 帶入特定日期,就會把在那個日期之前完成的item找到並加總point
  def count_date_point(date)
    # 每天的point總和：還沒完成的item的point加起來
    sum_point = 0
    items.each do |item|
      sum_point +=  item.point if item.finish_date.nil? || item.finish_date > date
    end
    return sum_point
  end

  def total_point
    # sum array of numbers, 把分數加總
    items.inject(0){|sum, item| sum + item.point}   
  end

  def group_person
    @group.board.workspace.users.map{ |user| user.name }.to_a
  end
end
