const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const SongsIndexItem = require('./songs_index_item');

const SongsIndex = React.createClass({
  getInitialState() {
    return {
      songs: SongStore.all(),
      initialized: false
    };
  },

  componentWillMount() {
    this.songListener = SongStore.addListener(this._onSongsChange);
    SongActions.fetchAlphabeticalSongs();
  },

  componentWillUnmount() {
    this.songListener.remove();
  },

  _onSongsChange(){
    if ( this.state.initialized ) {
      this.setState({ songs: SongStore.searchResults() });
    } else {
      this.setState({
        songs: SongStore.all(),
        initialized: true
      });
    }
  },


  render () {
    const items = this.state.songs.map(song => {
      return(
        <SongsIndexItem song={song} key={"index_" + song.id} />
      );
    });

    return (
      <div className="song-index">
        <div className="index-title">
          <h3>
            Everything in <span className="bright">so-genius</span>
          </h3>

        </div>
        {items}
      </div>
    );
  }
});

module.exports = SongsIndex;
