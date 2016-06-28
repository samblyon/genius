# Phase 3: Flux Architecture and Router (1.5 days)

## Rails
### Models

### Controllers

### Views

## Flux
### Views (React Components)
* SongDisplay
  * SongDisplayItem
* SongsIndex
  * SongsIndexItem
* SongForm
* Song
  * SongSplash
  * LyricsDisplay
    * Lyrics
  * SongInfo
    * SongInfoStats
    * SongAbout

### Stores
* Song

### Actions
* ApiActions.receiveSongs -> triggered by ApiUtil
* ApiActions.receiveSingleSong
* SongActions.fetchTopSongs -> triggers ApiUtil
* SongActions.fetchAlphabeticalSongs
* SongActions.fetchSingleSong
* SongActions.createSong

### ApiUtil

## Gems/Libraries
* Flux Dispatcher (npm)
* React Router (npm)
* Twitter Bootstrap
