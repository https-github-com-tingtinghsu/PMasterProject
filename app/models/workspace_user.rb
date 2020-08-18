class WorkspaceUser < ApplicationRecord
  belongs_to :user
  belongs_to :workspace
end
