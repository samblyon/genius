import React, { PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';

const Player = React.createClass({
  getInitialState() {
    return {
      player: false
      // youtubeUrl: this.props.youtubeUrl,
      // albumCover: this.props.albumCover
    };
  },
  //
  // componentWillMount(){
  //   this.setState({
  //     youtubeUrl: this.props.youtubeUrl,
  //     albumCover: this.props.albumCover
  //   });
  // },

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
        <div className="player">
          <YoutubePlayer
            key={videoId}
            videoId={videoId}
            playbackState='playing'
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
