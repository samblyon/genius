# Phase 1: User Authentication

## Rails
### Models
* User
* Song

### Controllers
* UsersController (create, new)
* SessionsController (create, new, destroy)
* Api::SongsController (create, index, show)

### Views
* users/new.html.erb
* session/new.html.erb
* songs/index.json.jbuilder
* songs/show.json.jbuilder

## Flux
### Views (React Components)
* App
* Header
  * HeaderAuth
  * HeaderUserProfile

### Stores

### Actions

### ApiUtil
ApiUtil.fetchTopSongs
ApiUtil.fetchAlphabeticalSongs
ApiUtil.fetchSingleSong
ApiUtil.createSong

## Gems/Libraries
* BCrypt (Gem)
