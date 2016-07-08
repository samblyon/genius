require_relative "lyrics"

User.create(
  email: "guest@guest.com",
  username: "guest",
  password: "guestguest"
)


destiny = {
  title: "Destiny",
  album_cover: "https://i.scdn.co/image/c4d1bdfec2d89bccee084633451120c4969e472a",
  artist: "Zero 7",
  featuring: "Sophie Barker & Sia",
  album: "Simple Things",
  about: "This is a song about the loneliness arising from being separated from one’s partner. The verses highlight the effects of this separation and how the speaker deals with them: pornography, longing, and fantasizing about being together. By contrast, the chorus details the positive effects of the lovers' togetherness. “Destiny” features a lush atmospheric accompaniment with keys and acoustic guitar. Peppered throughout are electronic sound effects and patterns – a staple of Zero 7’s pieces on the album Simple Things.",
  youtube_url: "https://www.youtube.com/watch?v=2fm7jt1pdX0",
  soundcloud_url: "https://soundcloud.com/zero7/destiny-simple-things",
  lyrics: LYRICS[:destiny]
}

peanut_butter_jelly = {
  title: "Peanut Butter Jelly",
  artist: "Galantis",
  album_cover: "https://i.scdn.co/image/d87d7b97348c80ef8dbd46d36c12f4836381dd61",
  produced_by: "Bloodshy & Style Of Eye",
  album: "Pharmacy",
  about: "“Peanut Butter Jelly” is the 9th track and the 3rd single from Galantis' album Pharmacy.",
  youtube_url: "https://www.youtube.com/watch?v=0DaInuaZz08",
  soundcloud_url: "https://soundcloud.com/wearegalantis/peanut-butter-jelly",
  lyrics: LYRICS[:peanut_butter_jelly]
}

yellow_submarine = {
  title: "Yellow Submarine",
  album_cover: "https://i.scdn.co/image/dba3850d7bae42990d211a15221decc09736f4fe",
  artist: "The Beatles",
  produced_by: "George Martin",
  album: "Revolver",
  about: "Though its imagery seems to be a perfect description of an acid trip, “Yellow Submarine” was written exclusively as a children’s song. Telling the story of a mariner showing his world to a group of children, the story takes you from reality to dreams while sailing the seas of dreams.",
  youtube_url: "https://www.youtube.com/watch?v=krIus0i9xn8",
  soundcloud_url: "https://soundcloud.com/thebeatlesrevisited/yellow-submarine",
  lyrics: LYRICS[:yellow_submarine]
}

panda = {
  title: "Panda",
  album_cover: "https://i.scdn.co/image/dcd1adc5177142820f5925429c5c3749701e8d41",
  artist: "Desiigner",
  produced_by: "Menace (UK)",
  album: "New English",
  youtube_url: "https://www.youtube.com/watch?v=E5ONTXHS2mM",
  lyrics: LYRICS[:panda],
  about: '“Panda” is inspired by the white BMW X6—Desiigner notes the luxury car’s resemblance to the endangered animal.
  
The Brooklyn-based rapper had the vision for this breakout track while playing the video game Grand Theft Auto V.
Desiigner uploaded the song to Soundcloud during December 2015—it quickly amassed more than a million plays. In February 2016, Kanye West incorporated two verses of this track into “Father Stretch My Hands Pt. 2,” for his album The Life of Pablo. He’d announce Desiigner’s signing to G.O.O.D. Music at the February 11th TLOP listening session at Madison Square Garden.
On April 25th, 2016, Billboard released their Hot 100 chart information regarding the week of May 7th’s top 10, with Panda becoming No. 1. By doing so, Desiigner broke the 41 week streak of non-Americans holding the No. 1 spot in the Hot 100.
Manchester producer Menace says he sold the “Panda” beat to Desiigner for $200. He was inspired by DC Comics character the Joker when creating this instrumental:
“He’s dark and gritty and my production is dark, gritty, taking-over-the-world type of production.”

A music video directed by Paul Geusebroek was released on May 10th 2016. In the video, Desiigner gets involved in a high speed car chase and a street fight. It features a cameo from Kanye amidst heavy uses of bodycam shots.
Vogue magazine also came out with their own version of the “Panda” video featuring model Andreea Diaconu romping around in a swimsuit in New York City.
After the tracks release many people started comparing Desiigner’s flow and sound to the one of Future. When Future was asked about the up and coming Brooklyn rapper he responded with, “I never worried about anyone else.“'
}

hells_bells = {
  title: "Hell's Bells",
  album_cover: "https://i.scdn.co/image/6638ea7a17b50291992aaf9dd86b640b021f178f",
  about: "The first track off of Back In Black, this song was written to commemorate the death of AC/DC’s former lead singer, Bon Scott. \n The second single off the album.",
  youtube_url: "https://www.youtube.com/watch?v=ugoCMKXblP4",
  artist: "AC/DC",
  produced_by: "Robert John \"Mutt\" Lange",
  album: "Back in Black",
  lyrics: LYRICS[:hells_bells]
}

you_and_me = {
  title: "You and Me",
  album_cover: "https://i.scdn.co/image/a6621a00e2d6251d232e5f36a2a364324ebdeb71",
  artist: "Lifehouse",
  produced_by: "John Alagia",
  album: "Lifehouse",
  lyrics: LYRICS[:you_and_me],
  youtube_url: "https://www.youtube.com/watch?v=rzJikUFVxes",
  about: "“You and Me” is a song by American Alternative band Lifehouse. It is the first single released from their eponymous third studio album, Lifehouse. The track was written by lead singer Jason Wade and American record producer Jude Cole. The song was first released via digital download on July 26, 2005. Musically, “You and Me” is a melodic Pop rock song which, by today’s standards, has a notably high emphasis on acoustics. It also contains influences of adult alternative.

On May 19, 2005, the song was certified Gold by the RIAA for selling more than 500,000 units in the United States. In 2005, it became the ninth most downloaded song, according to Nielen SoundScan. Because of it’s success, it appeared as the number one song on Billboard’s list of Top 40 Adult Pop Songs from 1996-2011 on March 16, 2011. “You and Me” has appeared on many television shows, including Smallville, Grey’s Anatomy, The Vampire Diaries, and Cold Case."

}

aint_misbehavin = {
  artist: "Louis Armstrong & His Orchestra",
  lyrics: LYRICS[:aint_misbehavin],
  title: "Ain't Misbehavin'",
  youtube_url: "https://www.youtube.com/watch?v=yE4itYYRvhg",
  album_cover: "http://i43.tower.com/images/mm106636073/aint-misbehavin-louis-armstrong-cd-cover-art.jpg",
  about: "Ain't Misbehavin was first performed at the premiere of Connie's Hot Chocolates at Connie's Inn in Harlem as an opening number by Margaret Simms and Paul Bass, and repeated later in the musical by Russell Wooding's Hallelujah Singers. Connie's Hot Chocolates transferred to the Hudson Theatre on Broadway in June 1929, where it was renamed to Hot Chocolates and where Louis Armstrong took over as orchestra director. The script also required Armstrong to play Ain't Misbehavin' in a trumpet solo, and although this was initially slated to only be a reprise of the opening song, Armstrong's performance was so well received that the trumpeter was asked to climb out of the orchestra pit and play the piece on stage."
}

a_d_g_l = {
  artist: "王力宏",
  title: "爱的鼓励",
  album: "Change Me",
  lyrics: LYRICS[:a_d_g_l],
  album_cover: "http://www.jpopasia.com/img/album-covers/1/1464-changeme-f2eu.jpg",
  youtube_url: "https://www.youtube.com/watch?v=QrRPns7UnJA",
  about: "Change Me is the 12th album of the Taiwanese American R&B artist and composer, Leehom Wang, and was released on July 13, 2007. The album sold more than one million copies within the first month of release."
}

gold = {
  title: "Gold",
  artist: "Adventure Club",
  lyrics: LYRICS[:gold],
  featuring: "Yuna",
  youtube_url: "https://www.youtube.com/watch?v=qxiwWqWAa2I",
  album_cover: "https://images.rapgenius.com/c1caf4a32f220b7444c00f7526b37f5e.840x612x1.jpg",
  about: "Adventure Club is a Canadian electronic dance music duo composed of Christian Srigley and Leighton James, based out of Montreal, Quebec."
}

ill_make_a_man_out_of_you = {
  album_cover: "https://images.genius.com/08234ccf8e05e926cab7012a9967711d.982x1000x1.jpg",
  title: "I\'ll Make a Man Out of You",
  lyrics: LYRICS[:ill_make_a_man_out_of_you],
  artist: "Walt Disney Records",
  featuring: "Eddie Murphy, Jerry Tondo, Lea Salonga, David Zippel, Matthew Wilder & Donny Osmond",
  youtube_url: "http://www.youtube.com/watch?v=ZSS5dEeMX64",
  about: "From the classic 1998 Disney animated film Mulan, this song details Captain Li Shang’s efforts to train his motley crew of soldiers into a fighting force capable of defending Imperial China from the Hunnic invaders."
}

escape_pina_colada = {
  title: "Escape (Pina Colada Song)",
  lyrics: LYRICS[:escape_pina_colada],
  artist: "Rupert Holmes",
  album: "Partners in Crime",
  about: "Escape (The Piña Colada Song) is a song written and recorded by British-born American singer Rupert Holmes for his album Partners in Crime. As the lead single for the album, the pop song was recommended by Billboard for radio broadcasters on September 29, 1979, then added to prominent US radio playlists in October–November.\n\n Rising in popularity, the song peaked at the end of December to become the last U.S. number one song of the 1970s.",
  album_cover: "https://i.scdn.co/image/8349f2a346df71b7be558aa3c5f4aca3979a3bbc",
  youtube_url: "https://www.youtube.com/watch?v=TazHNpt6OTo"
}

songs = [
  peanut_butter_jelly,
  yellow_submarine,
  panda,
  hells_bells,
  you_and_me,
  aint_misbehavin,
  a_d_g_l,
  gold,
  ill_make_a_man_out_of_you,
  escape_pina_colada
]

songs.each do |song|
  puts "Creating song"
  Song.create!(song)
end
