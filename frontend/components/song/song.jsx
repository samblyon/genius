const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');

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
    return (
      <div className="song">
        Hi from {this.state.song.title}!
      </div>
    );
  }
});

module.exports = Song;
