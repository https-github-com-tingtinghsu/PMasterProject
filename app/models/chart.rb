module Chart
  # ---------burndown chart methods----------
  def start_end_date_array
    #  group的第一天到最後一天
    (start_date.to_date..end_date.to_date).map {|date| date.strftime("%m/%d")}
  end

  # 回傳對應日期的加總point陣列
  def point_array
    (start_date.to_date..end_date.to_date).map {|date| count_date_point(date)}
  end

  # 實際完成的line: 帶入特定日期,就會把在那個日期之前完成的item找到並加總point
  def count_date_point(date)
    # 每天的point總和：還沒完成的item的point加起來
    sum_point = 0
    items.each do |item|
      sum_point +=  item.point if item.finish_date.nil? || item.finish_date > date
    end
    return sum_point
  end

  # 理想的line
  def avg_point_array
    total_day = (end_date.to_date  - start_date.to_date).to_i
    avg_day_point = total_point / total_day
    # 每天減一份平均值，減到只剩0為止
    total_point.step(0 ,-avg_day_point).to_a
  end

  def total_point
    items.inject(0){|sum, item| sum + item.point}   
  end

  # ---------pie chart methods----------

  def find_all_members_name
    board.workspace.all_members.map(&:name)
  end

  def find_all_members_id
    board.workspace.all_members.map(&:id)
  end

  def find_all_members_point_array
    # 把member_id當參數, 傳進另一個item的class method
    find_all_members_id.map{ |member_id| items.get_point_by_user_id(member_id)}
  end

  # ---------bar chart methods----------
  def find_items_array
    items.map(&:name)
  end

  def find_items_expected_spend_day_array
    items.map(&:expected_spend_day)
  end

  def find_items_actual_spend_day_array
    items.map(&:actual_spend_day)
  end
end