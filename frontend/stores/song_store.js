const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SongConstants = require('../constants/song_constants');
const CommentConstants = require('../constants/comment_constants');
const VoteConstants = require('../constants/vote_constants');

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
    case VoteConstants.VOTE_RECEIVED:
      if (payload.vote.upvotable_type === "Song") {
        _addVote(payload.vote);
        this.__emitChange();
      }
      break;
    case VoteConstants.VOTE_REMOVED:
      if (payload.vote.upvotable_type === "Song") {
        _removeVote(payload.vote);
        this.__emitChange();
      }
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
  const song = _songs[comment.commentable_id];
  const comments = song.comments;
  const existing_index = comments.findIndex((old_comment) => {
                            return old_comment.id === comment.id;
                          });
  if (existing_index > -1) {
    song.comments.splice(existing_index, 1, comment);
  } else {
    song.comments.push(comment);
  }

}

function _removeComment(comment){
  const songId = comment.commentable_id;
  const song = _songs[songId];
  const commentIds = song.comments.map(comment => comment.id);
  const commentIndex = commentIds.indexOf(comment.id);
  song.comments.splice(commentIndex, 1);
}

function _addVote(vote){
  const targetItemVotes = _songs[vote.upvotable_id]["votes"];
  if (targetItemVotes) {
    targetItemVotes[vote.user_id] = vote;
  } else {
    _songs[vote.upvotable_id]["votes"] = {
      [vote.user_id]: vote
    }
  }
}

function _removeVote(vote){
  delete _songs[vote.upvotable_id]["votes"][vote.user_id];
}

module.exports = SongStore;
