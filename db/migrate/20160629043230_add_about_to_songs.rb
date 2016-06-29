class AddAboutToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :about, :text
  end
end
