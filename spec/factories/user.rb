FactoryBot.define do
  factory :user do
    email { Faker::Internet.email }
    password {"=P&dFz5Y;4M.u;"}
    confirmed_at { Time.now } 
  end
end
# FactoryBot.create(:user)