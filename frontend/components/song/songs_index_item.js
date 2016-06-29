const React = require('react');
const hashHistory = require('react-router').hashHistory;

const SongsIndexItem = React.createClass({
  goToSong(){
    hashHistory.push("/songs/" + this.props.song.id);
  },

  render () {
    return (
      <li onClick={this.goToSong}
          id={this.props.song.id}
          className="songs-index-item">
        <div className="song-title">{this.props.song.title}</div>
        <div className="song-artist">{this.props.song.artist}</div>
      </li>
    );
  }
});

module.exports = SongsIndexItem;
