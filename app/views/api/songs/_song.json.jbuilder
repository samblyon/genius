json.extract! song,
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

json.score song.votes.inject(0) {|accum, vote| accum += vote.vote }
