class Invitation < ApplicationRecord
  belongs_to :user
  belongs_to :workspace
  belongs_to :receiver, foreign_key: :receive_user_id, class_name: 'User'
end
