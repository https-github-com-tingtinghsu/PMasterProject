class Room < ApplicationRecord
    has_many :messages, dependent: :destroy
    has_many :users, through: :messages
    belongs_to :workspace 
    # room 記得新增 Workspace_id
end
