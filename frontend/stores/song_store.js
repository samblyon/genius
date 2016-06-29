const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SongConstants = require('../constants/song_constants');

let _songs = {};

const SongStore = new Store(AppDispatcher);
