json.extract! @song,
  :id,
  :artist,
  :title,
  :lyrics,
  :youtube_url,
  :soundcloud_url,
  :featuring,
  :produced_by,
  :written_by,
  :release_date,
  :album,
  :album_cover,
  :about

json.comments @song.comments do |comment|
    json.partial! "/api/comments/comment", comment: comment
end
