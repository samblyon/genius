require_relative "lyrics"


10.times do
  Song.create(
    artist: Faker::Name.name,
    title: Faker::Book.title,
    lyrics: LYRICS.sample
  )
end
