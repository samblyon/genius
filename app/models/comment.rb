class Comment < ActiveRecord::Base
  validates :body, :author, presence: true

  belongs_to :author, class_name: :User, dependent: :destroy
  belongs_to :commentable, dependent: :destroy
end
