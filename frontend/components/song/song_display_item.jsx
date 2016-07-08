const React = require('react');
const hashHistory = require('react-router').hashHistory;

const SongDisplayItem = React.createClass({
  goToSong(){
    if (this.props.disabled) { return; }
    hashHistory.push("/songs/" + this.props.song.id);
  },

  render () {
    const itemStyle = {
      backgroundImage: 'url(' + this.props.song.album_cover + ')',
    };

    return (
      <li onClick={this.goToSong}
          id={this.props.song.id}
          className="song-display-item"
          style={itemStyle}>
        <span className="song-title">{this.props.song.title}</span>
        <span className="song-artist">{" by " + this.props.song.artist}</span>
      </li>
    );
  }
});

module.exports = SongDisplayItem;
