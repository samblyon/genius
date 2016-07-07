const React = require('react');
const SongInfoStats = require('./song_info_stats');
const SongAbout = require('./song_about');
import YoutubePlayer from 'react-youtube-player';

const SongInfo = React.createClass({
  getInitialState() {
    return {
      player: false
    };
  },

  activatePlayer(){
    this.setState({ player: true });
  },

  render() {
    const infoClass = (this.props.visible) ? "" : "invisible";
    const albumStyle = {
      backgroundImage: 'url(' + this.props.song.album_cover + ')',
    };

    let coverOrPlayer;
    if (this.state.player && this.props.song.youtube_url) {
      const videoId = this.props.song.youtube_url.split("v=")[1];
      coverOrPlayer = (
        <div className="player">
          <YoutubePlayer
            key={videoId}
            videoId={videoId}
            playbackState='unstarted'
            configuration={
              {
                showinfo: 0,
                controls: 0,
                height: '300px'
              }
            }
          />
        </div>
      );
    } else {
      coverOrPlayer = (
        <div className="album-cover"
          style={albumStyle}
          onClick={this.activatePlayer}/>
      );
    }

    return (
      <div className="song-info">
        {coverOrPlayer}
        <div className={infoClass}>
          <SongInfoStats song={this.props.song} />
          <SongAbout song={this.props.song} />
        </div>
      </div>
    );
  }

});

module.exports = SongInfo;
