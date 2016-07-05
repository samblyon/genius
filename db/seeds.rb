require_relative "lyrics"

User.create(
  email: "guest@guest.com",
  username: "guest",
  password: "guestguest"
)

10.times do
  Song.create(
    artist: Faker::Name.name,
    title: Faker::Book.title,
    lyrics: LYRICS.sample
  )
end

Song.all.each do |song|
  start = rand(50)
  finish = start + 100

  10.times do
    User.first.annotations.create(
      song_id: song.id,
      body: Faker::StarWars.quote,
      start_index: start,
      end_index: finish
    )
    start = (finish + 10)
    finish = (start + 1 + rand(20))
  end
end
