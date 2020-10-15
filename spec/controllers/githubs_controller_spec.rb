require 'rails_helper'

RSpec.describe GithubsController, type: :controller do
    it "#index" do
        # get :index
        expect(response.status).to be 200
    end
end