require 'rails_helper'

RSpec.describe Gittoke, type: :model do
  let(:gittoke) { create(:gittoke) }
  let(:gituser) { create(:user_id) }

  it "should contain :gittkon & :user_id" do
    # expect(:gittoke).to eq(gittoke)
  end
end
