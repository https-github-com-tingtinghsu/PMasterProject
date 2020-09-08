FactoryBot.define do
  factory :invitaion do
    token { "MyString" }
    workspace { "" }
    user { "" }
    receive_user_email { "MyString" }
    receive_user_id { 1 }
  end
end
