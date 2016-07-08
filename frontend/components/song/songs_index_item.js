const React = require('react');
const hashHistory = require('react-router').hashHistory;

const SongsIndexItem = React.createClass({
  goToSong(e){
    e.preventDefault();
    hashHistory.push("/songs/" + this.props.song.id);
  },

  render () {
    if (this.props.nullResult) {
      return (
        <li
          id="null"
          className="songs-index-item null-result">
          <div className="song-title">Hmm...</div>
          <div className="song-artist">Couldn't find a song or artist with those letters...</div>
        </li>
      );
    } else {
      return (
        <li onClick={this.goToSong}
          id={this.props.song.id}
          className="songs-index-item">
          <div className="song-title">{this.props.song.title}</div>
          <div className="song-artist">{this.props.song.artist}</div>
        </li>
      );
    }
  }
});

module.exports = SongsIndexItem;
