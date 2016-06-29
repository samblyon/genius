const AppDispatcher = require('../dispatcher/dispatcher');
const SongApiUtil = require('../util/song_api_util');
const ErrorActions = require('../actions/error_actions');
const SongConstants = require('../constants/song_constants');

module.exports = {
  fetchAlphabeticalSongs () {
    SongApiUtil.fetchAlphabeticalSongs(
      this.receiveSongs, ErrorActions.onError
    );
  },

  fetchTopSongs () {
    SongApiUtil.fetchTopSongs(
      this.receiveSongs, ErrorActions.onError
    );
  },

  fetchSingleSong (id) {
    SongApiUtil.fetchSingleSong(
      id, this.receiveSong, ErrorActions.onError
    );
  },

  createSong(song, formName) {
    SongApiUtil.createSong(
      song,
      this.receiveSong,
      ErrorActions.setSongErrors.bind(null, formName)
    );
  },

  receiveSongs(songs) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONGS_RECEIVED,
      songs: songs
    });
  },

  receiveSong(song) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONG_RECEIVED,
      song: song
    });
  }
};
