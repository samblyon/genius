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
