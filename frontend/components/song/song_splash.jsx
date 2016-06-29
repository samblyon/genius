const React = require('react');

const SongSplash = React.createClass({
  render () {
    return (
      <div className="song-splash">
        {this.props.song.title}
        {this.props.song.artist}
        {this.props.song.producedBy}
      </div>
    );
  }
});

module.exports = SongSplash;
