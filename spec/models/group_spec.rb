require 'rails_helper'

RSpec.describe Board, type: :model do
  let(:user1) { create(:user) }
  let(:workspace1) { create(:workspace, user_id: user1.id) }  
  let(:board1) { create(:board, workspace_id: workspace1.id) }  
  it "group BL to board" do
    group1 = Group.create(name: "test group", board_id: board1.id)
    expect(group1).to eq(board1.groups.last)
  end
end