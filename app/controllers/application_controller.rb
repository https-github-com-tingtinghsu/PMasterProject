class ApplicationController < ActionController::Base
  rescue_from ActiveRecord::RecordNotFound, with: :not_found

  class ApplicationController < ActionController::Base
    include Pundit
  end

  private
  def not_found
    redirect_to workspaces_path, notice: '抱歉，資料不存在'
  end
end

