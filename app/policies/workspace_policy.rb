class WorkspacePolicy < ApplicationPolicy
  attr_reader :user, :workspace

  def initialize(current_user, workspace)
    @current_user = current_user
    @workspace = workspace
  end

  # def edit?
  #   if admin?
  #     true
  #   elsif 
  #     true
  #   else
  #     false
  #   end
  # end

  def destroy?
    if admin?
      true
    elsif manager
      true
    else
      
    end
  end
end