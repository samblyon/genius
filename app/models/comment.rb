class Comment < ActiveRecord::Base
  validates :body, :author, presence: true

  belongs_to :author, class_name: :User
  belongs_to :commentable
end
