require_relative "songs"

User.create(
  email: "guest@guest.com",
  username: "guest",
  password: "guestguest"
)

SONGS.each do |song|
  puts "Creating song"
  Song.create!(song)

end

songs = Song.all

20.times do
  User.all.each do |user|
    puts "Adding upvote"
    songs.sample.votes.create(
    user_id: user.id,
    vote: [-1, 1].sample
    )
  end
end
