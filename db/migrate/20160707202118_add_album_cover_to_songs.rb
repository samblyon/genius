class AddAlbumCoverToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :album_cover, :string
    add_column :songs, :album, :string
  end
end
