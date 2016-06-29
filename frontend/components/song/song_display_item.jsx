const React = require('react');
const hashHistory = require('react-router').hashHistory;

const SongDisplayItem = React.createClass({
  goToSong(){
    hashHistory.push("/songs/" + this.props.song.id);
  },

  render () {
    return (
      <li onClick={this.goToSong}
          id={this.props.song.id}
          className="song-display-item">
        {this.props.song.title}
        {this.props.song.artist}
      </li>
    );
  }
});

module.exports = SongDisplayItem;
