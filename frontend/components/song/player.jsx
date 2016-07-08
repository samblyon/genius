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
    if (this.props.albumCover !== newProps.albumCover) {
      this.setState({
        player: false
      });
    }
  },

  render () {
    const albumStyle = {
      backgroundImage: 'url(' + this.props.albumCover + ')',
    };
    let coverOrPlayer;
    if (this.state.player && this.props.youtubeUrl) {
      const videoId = this.props.youtubeUrl.split("v=")[1];
      coverOrPlayer = (
        <div className="player-box">
          <div className="spinner" />
          <div className="player">
            <YoutubePlayer
              key={videoId}
              className="spinner"
              videoId={videoId}
              playbackState='playing'
              configuration={
                {
                  showinfo: 0,
                  controls: 1,
                }
              }
              />
          </div>
        </div>
      );
    } else {
      coverOrPlayer = (
        <div className="album-cover"
          style={albumStyle}
          onClick={this.activatePlayer}>
          <div className="album-cover-overlay"/>
        </div>
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
