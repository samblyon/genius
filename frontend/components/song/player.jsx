import React, { PropTypes } from 'react'
import YoutubePlayer from 'react-youtube-player';
const Uploader = require('../../util/uploader');
const SongActions = require('../../actions/song_actions');

const Player = React.createClass({
  getInitialState() {
    return {
      player: !this.props.albumCover,
      playbackState: 'paused',
      uploader: !(this.props.albumCover || this.props.youtubeUrl)
    };
  },

  activatePlayer(){
    if (this.props.youtubeUrl) {
      this.setState({
        player: true,
        playbackState: 'playing'
      });
    }
  },

  togglePlayback(){
    this.setState({
      playbackState: (this.state.playbackState === 'paused') ? 'playing' : 'paused'
    });
  },

  componentWillReceiveProps(newProps) {
    if ((this.props.albumCover !== newProps.albumCover)
          || (this.props.youtubeUrl !== newProps.youtubeUrl)) {
      this.setState({
        player: false
      });
    }
  },

  postAlbumCover(image){
    const song = {
      album_cover: image.secure_url,
      id: this.props.songId
    }
    SongActions.updateSong(song);
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
              videoId={videoId}
              playbackState={this.state.playbackState}
              configuration={
                {
                  showinfo: 0,
                  controls: 1,
                }
              }
              />
            <div className="player-overlay" onClick={this.togglePlayback}/>
          </div>
        </div>
      );
    } else if (this.props.albumCover){
      let playButtonOverlay;
      let coverClass = "album-cover no-play-symbol";

      if (this.props.youtubeUrl) {
        playButtonOverlay = (
          <div className="album-cover-overlay" onClick={this.togglePlayback}/>
        )
        coverClass = "album-cover"
      }

      coverOrPlayer = (
        <div className={coverClass}
          style={albumStyle}
          onClick={this.activatePlayer}>
          {playButtonOverlay}
        </div>
      );
    } else {
      coverOrPlayer = (
        <div className="player-box">
          <Uploader post={this.postAlbumCover}/>
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
