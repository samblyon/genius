class Song < ActiveRecord::Base
  validates :artist, :title, :lyrics, presence: true

end
