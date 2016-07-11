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
    const tiles = this.state.songs.map(song => {
      return(
        <SongDisplayItem song={song} key={song.id} />
      );
    });

    return (
      <div>
        <div className="song-display-splash">
          <div className="song-display-splash-text">
            The premier location for lyrics annotation & discussion
            inspired by rapGenius
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
                <span className="bright">So-Genius</span> is a <span className="bright">lyrics annotation and discussion website </span>
                admiringly based on <a href="http://rap.genius.com">Rap Genius</a>.
                Pick a song and jump in: beyond signature Genius features like highlight-to-annotate
                and login-in-place, So-Genius delivers snappy front-end authentication,
                eager-loading, and as-you-type search using React and Rails. Check out the developer,
                Samuel Lyon, on <a href="http://github.com/samblyon">github</a> or
                <a href="https://www.linkedin.com/in/samuellyon"> LinkedIn</a>.
                </p>
              </div>
            </div>
        </div>
      </div>
    );
  }
});

module.exports = SongDisplay;
