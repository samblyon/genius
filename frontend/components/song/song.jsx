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

  handleHighlightClick(e){
    alert(e.target.id);
  },

  populatedLyrics(){
    if (this.state.annotations.length === 0) {
      return [];
    }

    const lyrics = this.state.song.lyrics;
    const lyricsEls = [];

    let tracked = 0;
    for (let annotation of this.state.annotations) {
      lyricsEls.push(
        lyrics.slice(tracked, annotation.start_index)
      );

      lyricsEls.push(
        <a onClick={this.handleHighlightClick}
           key={annotation.id}
           id={annotation.id}
           className="highlight">
          {
            lyrics.slice(annotation.start_index, annotation.end_index + 1)
          }
        </a>
      );

      tracked = annotation.end_index + 1;
    }

    lyricsEls.push(lyrics.slice(tracked));

    return lyricsEls;
  },

  render () {
    const song = this.state.song;

    const annotations = this.state.annotations;
    const lyrics = this.populatedLyrics();

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
