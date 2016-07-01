class Song < ActiveRecord::Base
  validates :artist, :title, :lyrics, presence: true
  has_many :annotations
end
