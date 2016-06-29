class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.string :artist, null: false
      t.string :title, null: false
      t.text :lyrics, null: false
      t.string :youtube_url
      t.string :soundcloud_url
      t.string :featuring
      t.string :produced_by
      t.string :written_by
      t.date :release_date

      t.timestamps null: false
    end
    add_index :songs, [:artist, :title]
  end
end
