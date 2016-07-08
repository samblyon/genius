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
        <div className="song-display-splash" />
        <div className="song-display-page">
          <div className="song-displays">
            <h3>About So-Genius</h3>
            <div className="song-display">
              <div className="about">
                <p>
                  So-Genius is a lyrics annotation and discussion website
                  based on <a href="http://rap.genius.com">Rap Genius</a>.
                  Rap Genius's signature highlight-to-annotate and login-in-place features
                  are achieved here using React, with data drawn from a Ruby on Rails
                  API. Jump in and annotate.
                </p>
              </div>
            </div>
            <h3>Hot on So-Genius</h3>
            <div className="song-display">
              {tiles}
            </div>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SongDisplay;
