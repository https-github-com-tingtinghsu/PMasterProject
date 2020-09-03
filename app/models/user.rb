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

end
