FactoryBot.define do
  factory :workspace do
    name { Faker::Name.name }
    user_id { nil }  
  end
end
# 關聯：建立workspace時才給user_id
# FactoryBot.create(:workspace, user_id: 34)