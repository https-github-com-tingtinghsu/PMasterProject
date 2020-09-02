class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  has_many :workspaces

  has_many :assignments
  has_many :items, through: :assignments   
  
  has_many :posts
  has_many :replies

  def as_member
    Member.find(id)
  end
end
