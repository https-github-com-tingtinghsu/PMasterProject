require 'rails_helper'

RSpec.describe "Webrtcs", type: :request do
  describe "GET /index" do
    it "returns http success" do
      get "/webrtc"
      expect(response).to have_http_status(:success)
      expect(response.status).to be 200
    end
  end
end
