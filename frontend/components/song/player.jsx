import React, { PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';

const Player = React.createClass({
  getInitialState() {
    return {
      player: false
    };
  },

  activatePlayer(){
    this.setState({ player: true });
  },

  componentWillReceiveProps(newProps) {
    this.setState({ player: false });
  },

  render () {
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
                controls: 1,
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
      <div class="song-info">
        {coverOrPlayer}
      </div>
    );
  }
})

module.exports = Player;
