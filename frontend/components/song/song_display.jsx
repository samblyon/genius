const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const SongDisplayItem = require('./song_display_item');

const SongDisplay = React.createClass({
  getInitialState() {
    return {
      songs: []
    };
  },

  componentWillMount() {
    this.songListener = SongStore.addListener(this._onSongsChange);
    SongActions.fetchTopSongs();
  },

  componentWillUnmount() {
    this.songListener.remove();
  },

  _onSongsChange(){
    this.setState({ songs: SongStore.all() });
  },


  render () {
    const tiles = this.state.songs.map(song => {
      return(
        <SongDisplayItem song={song} key={song.id} />
      );
    });

    return (
      <div className="song-display-page">
        <div className="blog">
          <div><h3>latest on so-genius</h3></div>
          <div className="blog-post">
            <div className="blog-post-image" />
            <div className="post-title">Post post post Post</div>
            <div className="post-content">
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
            </div>
          </div>
          <div className="blog-post">
            <div className="blog-post-image" />
            <div className="post-title">Post post post Post</div>
            <div className="post-content">
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
              Post post post Post post postPost post postPost post post
            </div>
          </div>
        </div>
        <div className="song-displays">
          <h3>About So-Genius</h3>
          <div className="song-display">
            <div className="song-display-item about">
              <div className="image-container" />
              <p>
                Rap Genius is dedicated to crowd-sourced
                (and artist/producer-sourced) annotation of rap
                lyrics/beats, from “Rapper’s Delight” to To Pimp A
                Butterfly. Find out all the latest on Twitter and Facebook
              </p>
            </div>
          </div>
          <h3>Hot on So-Genius</h3>
          <div className="song-display">
            {tiles}
          </div>
        </div>
      </div>
    );
  }
});

module.exports = SongDisplay;
