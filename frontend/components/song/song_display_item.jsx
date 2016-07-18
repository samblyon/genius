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

    const score = this.props.song.score || 0;

    return (
      <li onClick={this.goToSong}
          id={this.props.song.id}
          className="song-display-item"
          style={itemStyle}>
          <div className="song-display-order-triangle"></div>
          <div className="song-display-order">{this.props.order}</div>
        <div className="song-display-item-info-container">
          <div className="song-display-item-info">
            <div className="song-title">{this.props.song.title}</div>
            <div className="song-artist">{this.props.song.artist}</div>
            <div className="song-display-about">{this.props.song.about}</div>
            <div className="song-display-score">{score} net upvotes</div>
          </div>
        </div>
      </li>
    );
  }
});

module.exports = SongDisplayItem;
