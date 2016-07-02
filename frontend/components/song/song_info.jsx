const React = require('react');
const SongInfoStats = require('./song_info_stats');
const SongAbout = require('./song_about');

const SongInfo = React.createClass({

  render() {
    const infoClass = (this.props.visible) ? "song-info" : "invisible";

    return (
      <div className={infoClass}>
        <div className="album-cover" />
        <SongInfoStats song={this.props.song} />
        <SongAbout song={this.props.song} />
      </div>
    );
  }

});

module.exports = SongInfo;
