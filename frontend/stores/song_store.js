const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SongConstants = require('../constants/song_constants');

let _songs = {};
let _latestAddedSong = {};

const SongStore = new Store(AppDispatcher);

SongStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case SongConstants.SONGS_RECEIVED:
      _resetSongs(payload.songs);
      this.__emitChange();
      break;
    case SongConstants.SONG_RECEIVED:
      _songs[payload.song.id] = payload.song;
      _latestAddedSong = payload.song;
      this.__emitChange();
      break;
  }
};

SongStore.find = function (id) {
  return _songs[id];
};

SongStore.all = function () {
  return Object.keys(_songs).map(id => {
    return _songs[id];
  });
};

SongStore.latestAdded = function (){
  return _latestAddedSong;
};

function _resetSongs(songs){
  _songs = songs;
}

module.exports = SongStore;
