require 'rails_helper'

RSpec.describe Workspace, type: :model do
  # let: 呼叫時才會產生實體
  let(:user1) { create(:user) }
  let(:user2) { create(:user) }    
  let(:workspace1) { create(:workspace, user_id: user1.id) }

  it "user create workspace" do
    # 如果先呼叫user1, 因為還沒產生workspace1, created_workspaces會是nil，造成測試報錯
    expect(workspace1.creator).to eq(user1)    
    expect(user1.created_workspaces.first).to eq(workspace1)
  end

  it "add user into workspace" do
    workspace1.users << user2
    expect(workspace1.users.first).to eq(user2)
    expect(user2.workspaces.first).to eq(workspace1)
  end
end