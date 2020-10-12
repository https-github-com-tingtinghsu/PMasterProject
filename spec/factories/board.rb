FactoryBot.define do
  factory :board do
    name { Faker::Name.name }
    workspace
  end
end
