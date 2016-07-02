const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const AnnotationStore = require('../../stores/annotation_store');
const AnnotationActions = require('../../actions/annotation_actions');
const AnnotationPrompt = require('../annotation/annotation_prompt');
const Annotation = require('../annotation/annotation');
const SongSplash = require('./song_splash');
const SongInfo = require('./song_info');
const LyricsDisplay = require('./lyrics_display');


const Song = React.createClass({
  getInitialState: function() {
    return {
      song: {},
      annotations: [],
      editing: false,
      selectedStart: "",
      selectedEnd: "",
    };
  },

  componentDidMount(){
    this.songListener = SongStore.addListener(this._onSongChange);
    this.annotationListener = AnnotationStore.addListener(this._onAnnotationChange);
    this.songId = parseInt(this.props.params.songId);
    SongActions.fetchSingleSong(this.songId);
  },

  componentWillUnmount() {
    this.songListener.remove();
    this.annotationListener.remove();
  },

  componentWillReceiveProps(newProps) {
    this.songId = parseInt(newProps.routeParams.songId);
    SongActions.fetchSingleSong(this.songId);
  },

  _onSongChange(){
    this.setState({ song: SongStore.find(this.songId) });
  },

  _onAnnotationChange(){
    this.setState({ annotations: AnnotationStore.all() });
  },

  handleHighlight(){
    const selection = window.getSelection();
    console.log(selection.anchorOffset, selection.focusOffset);
    this.setState({
      selectedStart: selection.anchorOffset,
      selectedEnd: selection.focusOffset
    });

  },

  handlePromptClick(){
    this.setState({ editing: true });
    console.log("handled prompt click");
  },

  populatedLyrics(){
    const lyrics = this.state.song.lyrics.split("");

    for (let annotation of this.state.annotations) {
      lyrics.splice(annotation.end_index, 0, '</a>');
      lyrics.splice(annotation.start_index, 0, '<a id="' + annotation.id + '" "class="highlight">');
    }

    return lyrics.join("");
  },

  render () {
    const song = this.state.song;

    const annotations = this.state.annotations;
    let lyrics = "";
    if (this.state.song.lyrics) { lyrics += this.populatedLyrics(); }

    return (
      <div className="song">
        <SongSplash song={song} />
        <div className="not-splash">
          <div className="song-left-col">
            <LyricsDisplay song={song}
                populatedLyrics={lyrics}
                onHighlight={this.handleHighlight} />
          </div>
          <div className="song-right-col">
            <SongInfo song={song} />
            <AnnotationPrompt handleClick={this.handlePromptClick} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Song;
