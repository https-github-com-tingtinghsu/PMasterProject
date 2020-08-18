class WorkplaceUser < ApplicationRecord
  belongs_to :user
  belongs_to :workplace
end
