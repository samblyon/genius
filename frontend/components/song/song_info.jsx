const React = require('react');
const SongInfoStats = require('./song_info_stats');
const SongAbout = require('./song_about');

const SongInfo = React.createClass({

  render() {
    return (
      <div class="song-info">
        <SongInfoStats song={this.props.song} />
        <SongAbout song={this.props.song} />
      </div>
    );
  }

});

module.exports = SongInfo;
