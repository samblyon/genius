class Annotation < ActiveRecord::Base
  validates :song,
            :author,
            :start_index,
            :end_index,
            :body,
            presence: true

  belongs_to :song
  belongs_to :author,
    foreign_key: :author_id,
    primary_key: :id,
    class_name: :User

  has_many :comments, as: :commentable, dependent: :destroy

end
