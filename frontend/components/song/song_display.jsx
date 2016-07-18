const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const SongDisplayItem = require('./song_display_item');

const SongDisplay = React.createClass({
  getInitialState() {
    return {
      songs: []
    };
  },

  componentWillMount() {
    this.songListener = SongStore.addListener(this._onSongsChange);
    SongActions.fetchTopSongs();
  },

  componentWillUnmount() {
    this.songListener.remove();
  },

  _onSongsChange(){
    this.setState({ songs: SongStore.all() });
  },


  render () {
    const tiles = this.state.songs.map((song, index) => {
      return(
        <SongDisplayItem song={song} order={index + 1} key={song.id} />
      );
    });

    return (
      <div>
        <div className="song-display-splash">
          <div className="song-display-splash-text">
            Where the world comes to
            <p>annotate & discuss lyrics</p>
          </div>
        </div>
        <div className="song-display-page">
          <div className="song-displays">
            <h3>Hot on So-Genius</h3>
            <div className="song-display">
              {tiles}
            </div>
          </div>
          <div className="song-display">
            <div className="about">
              <p>
                So-Genius is a lyrics annotation and discussion website
                admiringly based on <a href="http://rap.genius.com">Rap Genius</a>.
                Beyond signature Genius features like highlight-to-annotate
                and login-in-place, So-Genius delivers snappy front-end authentication,
                eager-loading, and as-you-type search using React and Rails. Pick a song and jump in.
                </p>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = SongDisplay;
