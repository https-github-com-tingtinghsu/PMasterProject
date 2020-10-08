require 'rails_helper'

RSpec.describe BoardsController, type: :controller do
  let(:user) { create(:user) }
  let(:workspace) { create(:workspace, creator: user) }

  before { sign_in user }

  describe '#index' do
    let(:board) { create(:board, workspace: workspace) }
    let(:final_json) do
      { 
        created_boards: [
          {
            id: board.id,
            name: board.name,
            slug: board.slug
          }
        ]
      }.to_json
    end

    it 'should response json' do
      get :index, params: { workspace_id: board.workspace_id, slug: board.slug }
      expect(response.status).to be 200
      expect(response.body).to eq(final_json)
    end
  end

  describe '#update' do
    let(:board) { create(:board, workspace: workspace) }
    let(:change_name) { 'TEST-board' }

    it 'should update board' do
      patch :update, params: { id: board.id, name: change_name }
      expect(response.status).to be 200
      expect(board.reload.name).to eq(change_name)
    end
  end
end
