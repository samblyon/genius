class Vote < ActiveRecord::Base
  validates :user, :vote, :upvotable, presence: true

  belongs_to :user
  belongs_to :upvotable
end
