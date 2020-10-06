FactoryBot.define do
  factory :workspace do
    name { Faker::Name.name }
    association :creator, factory: :user
  end
end
# 關聯：建立workspace時才給user_id
# FactoryBot.create(:workspace, user_id: 34)