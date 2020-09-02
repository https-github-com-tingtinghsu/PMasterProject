class WorkspaceUser < ApplicationRecord
  belongs_to :member, foreign_key: :user_id
  belongs_to :workspace
  validates_uniqueness_of :user_id, :scope => :workspace_id
end
