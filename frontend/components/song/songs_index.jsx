const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const SongsIndexItem = require('./song_display_item');

const SongsIndex = React.createClass({
  getInitialState() {
    return {
      songs: []
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
    this.setState({ songs: SongStore.all() });
  },


  render () {
    const items = this.state.songs.map(song => {
      return(
        <SongsIndexItem song={song} key={song.id} />
      );
    });

    return (
      <div className="song-display">
        Hi from the song index
        {items}
      </div>
    );
  }
});

module.exports = SongsIndex;
