const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SongConstants = require('../constants/song_constants');
const CommentConstants = require('../constants/comment_constants');

let _songs = {};
let _searchResults = {};
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
    case SongConstants.SEARCH_RESULTS_RECEIVED:
      _searchResults = payload.songs;
      this.__emitChange();
      break;
    case CommentConstants.SONG_COMMENT_RECEIVED:
      _addComment(payload.comment);
      this.__emitChange();
      break;
    case CommentConstants.SONG_COMMENT_REMOVED:
      _removeComment(payload.comment);
      this.__emitChange();
      break;
  }
};

SongStore.find = function (id) {
  return _songs[id];
};

SongStore.all = function () {
  return arrayVersionOfDict(_songs);
};

SongStore.latestAdded = function (){
  return _latestAddedSong;
};

SongStore.searchResults = function(){
  return arrayVersionOfDict(_searchResults);
};

function arrayVersionOfDict(dict){
  return Object.keys(dict).map(id => {
    return dict[id];
  });
}

function _resetSongs(songs){
  _songs = songs;
}

function _addComment(comment){
  const songId = comment.commentable_id;
  _songs[songId].comments.push(comment);
}

function _removeComment(comment){
  const songId = comment.commentable_id;
  const song = _songs[songId];
  const commentIndex = song.comments.indexOf(comment);
  song.comments.splice(commentIndex, 1);
}

module.exports = SongStore;
