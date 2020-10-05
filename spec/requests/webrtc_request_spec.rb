require 'rails_helper'

RSpec.describe "Webrtcs", type: :request do

  describe "GET /index" do
    it "returns http success" do
      get "/webrtc/index"
      expect(response).to have_http_status(:success)
    end
  end

end
