class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :validatable, :confirmable

  has_many :created_workspaces, class_name: 'Workspace'
  has_many :workspace_users
  has_many :workspaces, through: :workspace_users 

  has_many :assignments
  has_many :items, through: :assignments   
  
  has_many :posts
  has_many :replies
  has_many :invitations

  has_many :post_likes
  has_many :likes_posts, through: :post_likes, source: :post

  scope :asc, -> { order('id ASC')}
  after_create :onboard_data

  def toggle_likes_post(p)
    # 判斷當前使用者是否按過該篇文章的讚
    # 如果按過了，就砍掉，意即取消按讚
    # 如果還沒按過讚，就改為已按讚
    if likes_posts.exists?(p.id)
      likes_posts.destroy(p)
    else
      likes_posts << p
    end
  end

  def display_name
    # 如果有name就顯示，不然才顯示email
    name || email
  end

  def onboard_data
    onboard_workspace = self.created_workspaces.create(name: "我的工作區")
    room = onboard_workspace.create_room(name:"工作聯絡室-#{onboard_workspace.name}")    
    onboard_board = onboard_workspace.boards.create(name: "DEMO看板")

    onboard_group = onboard_board.groups.create(name: "我的專案", start_date: Time.now, end_date: Time.now + 5.days)
    onboard_item_1 = onboard_group.items.create(name: "製作簡報", point: 5.0, status: "進行中")
    onboard_item_2 = onboard_group.items.create(name: "網站部署", point: 13.0)
    onboard_item_2 = onboard_group.items.create(name: "設計手冊", point: 5.0)

    onboard_item_1.users << self
  end
end