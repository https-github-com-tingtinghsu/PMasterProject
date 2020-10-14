require 'rails_helper'

RSpec.describe Gittoke, type: :model do

  it "has token user_id columns" do
    columns = Gittoke.column_names
    expect(columns).to include("token")
    expect(columns).to include("user_id")
  end
end
