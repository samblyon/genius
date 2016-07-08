const React = require('react');

const SongSplash = React.createClass({
//http://stackoverflow.com/questions/27966468/reactjs-change-background-image-dynamically
//set background image dynamically
  render () {
    let splashStyle;

    if (this.props.song.album_cover) {
      splashStyle = {
        backgroundImage: 'url(' + this.props.song.album_cover + ')',
      };
    }

    return (
      <div className="song-splash" style={splashStyle}>
        <div className="splash-content">
          <div className="splash-title">{this.props.song.title}</div>
          <div className="splash-artist">{this.props.song.artist}</div>
          {this.props.song.producedBy}
        </div>
      </div>
    );
  }
});

module.exports = SongSplash;
