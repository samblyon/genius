class Song < ActiveRecord::Base
  validates :artist, :title, :lyrics, presence: true
  has_many :annotations
  has_many :comments, as: :commentable
  has_many :votes, as: :upvotable, dependent: :destroy

end
