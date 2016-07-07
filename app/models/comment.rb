class Comment < ActiveRecord::Base
  validates :body, :author, presence: true

  belongs_to :author, class_name: :User
  belongs_to :commentable

  has_many :votes, as: :upvotable, dependent: :destroy

end
