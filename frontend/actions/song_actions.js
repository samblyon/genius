const AppDispatcher = require('../dispatcher/dispatcher');
const SongApiUtil = require('../util/song_api_util');
const AnnotationActions = require('./annotation_actions');
const ErrorActions = require('./error_actions');
const SongConstants = require('../constants/song_constants');

module.exports = {
  fetchAlphabeticalSongs () {
    SongApiUtil.fetchAlphabeticalSongs(
      this.receiveSongs, ErrorActions.onError
    );
  },

  fetchSongsByQuery (query) {
    SongApiUtil.fetchSongsByQuery(
      query, this.receiveSearchResults, ErrorActions.onError
    );
  },

  fetchTopSongs () {
    SongApiUtil.fetchTopSongs(
      this.receiveSongs, ErrorActions.onError
    );
  },

  updateSong(song) {
    SongApiUtil.updateSong(
      song, this.receiveSong, ErrorActions.onError
    );
  },

  fetchSingleSong (id) {
    AnnotationActions.fetchAnnotations(
      id,
      AnnotationActions.receiveAnnotations,
      ErrorActions.onError
    );
    SongApiUtil.fetchSingleSong(
      id, this.receiveSong, ErrorActions.onError
    );
  },

  createSong(song, formName) {
    SongApiUtil.createSong(
      song,
      this.receiveSong,
      ErrorActions.setFormErrors.bind(null, formName)
    );
  },

  receiveSongs(songs) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONGS_RECEIVED,
      songs: songs
    });
  },

  receiveSearchResults(songs) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SEARCH_RESULTS_RECEIVED,
      songs: songs
    })
  },

  receiveSong(song) {
    AppDispatcher.dispatch({
      actionType: SongConstants.SONG_RECEIVED,
      song: song
    });
  }
};
