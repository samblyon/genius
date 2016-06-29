const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const SongForm = React.createClass({
  getInitialState() {
    return {
      artist: "",
      title: "",
      lyrics: "",
      youtubeUrl: "",
      soundcloudUrl: "",
      featuring: "",
      producedBy: "",
      writtenBy: "",
      releaseDate: "",
      about: "",
      submitting: false,
      errors: {}
    };
  },

  componentDidMount(){
    this.songListener = SongStore.addListener(this._onSongChange);
    this.errorListener = ErrorStore.addListener(this._onErrorChange);
  },

  componentWillUnmount(){
    this.songListener.remove();
    this.errorListener.remove();
  },

  _onSongChange(){
    const song = SongStore.latestAdded();
    hashHistory.push("songs/" + song.id);
    this.songListener.remove();
  },

  _onErrorChange(){
    this.setState({ errors: ErrorStore.formErrors("song") });
    this.setState({ submitting: false });
  },

  receiveChange(e){
    e.preventDefault();
    this.setState({
      [e.target.name]: e.target.value
    });
  },

  handleSubmit(e){
    e.preventDefault();
    const song = {
      artist: this.state.artist,
      title: this.state.title,
      lyrics: this.state.lyrics,
      youtube_url: this.state.youtubeUrl,
      soundcloud_url: this.state.soundcloudUrl,
      featuring: this.state.featuring,
      produced_by: this.state.producedBy,
      written_by: this.state.writtenBy,
      release_date: this.state.releaseDate,
      about: this.state.about
    };
    SongActions.createSong(song, "song");
    this.setState({ submitting: true });
  },

  render() {
    return (
      <div className="song-form-container">
        <form className="song-form" onSubmit={this.handleSubmit}>
          <label>
            By
            {this.state.errors.artist}
            <input type="text"
                   value={this.state.artist}
                   name="artist"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Title
            {this.state.errors.title}
            <input type="text"
                   value={this.state.title}
                   name="title"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Lyrics
            {this.state.errors.lyrics}
            <textarea onChange={this.receiveChange}
                      name="lyrics"
                      defaultValue={this.state.lyrics} />
          </label>
          <label>
            About
            {this.state.errors.about}
            <textarea onChange={this.receiveChange}
                      name="about"
                      defaultValue={this.state.about} />
          </label>
          <label>
            Featuring
            <input type="text"
                   value={this.state.featuring}
                   name="featuring"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Produced By
            <input type="text"
                   value={this.state.producedBy}
                   name="producedBy"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Written By
            <input type="text"
                   value={this.state.writtenBy}
                   name="writtenBy"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Soundcloud URL
            <input type="text"
                   value={this.state.soundcloudUrl}
                   name="soundcloudUrl"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            YouTube URL
            <input type="text"
                   value={this.state.youtubeUrl}
                   name="youtubeUrl"
                   onChange={this.receiveChange}/>
          </label>
          <label>
            Release Date
            <input type="date"
                   value={this.state.releaseDate}
                   name="releaseDate"
                   onChange={this.receiveChange}/>
          </label>

          <input type="submit"
                 value="Submit"
                 disabled={this.state.submitting}/>
        </form>
      </div>
    );
  }

});

module.exports = SongForm;
