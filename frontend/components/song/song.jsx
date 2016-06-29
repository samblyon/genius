const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const SongSplash = require('./song_splash');
const SongInfo = require('./song_info');
const LyricsDisplay = require('./lyrics_display');


const Song = React.createClass({
  getInitialState: function() {
    return {
      song: {}
    };
  },

  componentWillMount(){
    this.songListener = SongStore.addListener(this._onSongChange);
    this.songId = parseInt(this.props.params.songId);
    SongActions.fetchSingleSong(this.songId);
  },

  componentWillUnmount() {
    this.songListener.remove();
  },

  componentWillReceiveProps(newProps) {
    this.songId = parseInt(newProps.routeParams.songId);
    SongActions.fetchSingleSong(this.songId);
  },

  _onSongChange(){
    this.setState({ song: SongStore.find(this.songId)});
  },

  render () {
    const song = this.state.song;
    return (
      <div className="song">
        <SongSplash song={song} />
        <LyricsDisplay song={song} />
        <SongInfo song={song} />
      </div>
    );
  }
});

module.exports = Song;
