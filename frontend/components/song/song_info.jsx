const React = require('react');
const SongInfoStats = require('./song_info_stats');
const SongAbout = require('./song_about');

const SongInfo = React.createClass({
  render() {
    const infoClass = (this.props.visible) ? "" : "invisible";

    return (
      <div className="song-info">
        <div className={infoClass}>
          <SongInfoStats song={this.props.song} />
          <SongAbout song={this.props.song} />
        </div>
      </div>
    );
  }

});

module.exports = SongInfo;
