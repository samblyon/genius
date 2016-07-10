class Vote < ActiveRecord::Base
  validates :user, :vote, :upvotable, presence: true
  validates :vote, inclusion: [1, 0, -1]
  validates_uniqueness_of :user, scope: [:upvotable_id, :upvotable_type]

  belongs_to :user
  belongs_to :upvotable, polymorphic: true
end
