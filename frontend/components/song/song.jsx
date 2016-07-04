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
const Modal = require('react-modal');


const Song = React.createClass({
  getInitialState: function() {
    return {
      song: {},
      annotations: [],
      editing: false,
      selectedStart: "",
      selectedEnd: "",
      showPrompt: false,
      showAnnotationForm: false,
      showInfo: true
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

    //switch to editing mode if there is a temp annotation
    if (AnnotationStore.temp()) {
      this.switchToEditingMode();
    }
  },

  switchToEditingMode(){
    this.setState({
      showPrompt: false
    });

    //other stuff
  },

  handleHighlight(e){
    const selection = window.getSelection();
    console.log(selection.anchorOffset, selection.focusOffset);
    this.setState({
      selectedStart: selection.anchorOffset,
      selectedEnd: selection.focusOffset
    });
    if (!this.selectionOverlapping(
          selection.anchorOffset, selection.focusOffset
    )) {
      this.activateAnnotationPrompt();
    }
  },

  selectionOverlapping(startIdx, endIdx){
    return this
      .state
      .annotations
      .filter(annotation => {
        return !(
          endIdx < annotation.start_index
          ||
          startIdx > annotation.end_index
        );
      })
      .length > 0;
  },

  activateAnnotationPrompt(){
    this.setState({
      showPrompt: true,
      showInfo: false
    });
    window.addEventListener("click", (event) => {
      if (event.target.id !== "annotation-prompt"
        && event.target.id !== "annotation-button"
        && this.state.showPrompt
      ){
        this.closeAnnotationPrompt();
        this.setState({
          showInfo: true
        });
      }
    });
  },

  closeAnnotationPrompt(){
    this.setState({
      showPrompt: false
    });
  },

  handlePromptClick(){
    console.log("handled prompt click");
    AnnotationActions.createTempAnnotation({
      start_index: this.state.selectedStart,
      end_index: this.state.selectedEnd,
      body: "",
      song_id: this.songId
    });
  },

  handleHighlightClick(e){
    alert(e.target.id);
  },

  render () {
    const song = this.state.song;
    const annotations = this.state.annotations;

    return (
      <div className="song">
        <SongSplash song={song} />
        <div className="not-splash">
          <div className="song-left-col">
            <LyricsDisplay
                song={song}
                annotations={annotations}
                onHighlight={this.handleHighlight}
                handleHighlightClick={this.handleHighlightClick} />
          </div>
          <div className="song-right-col">
            <SongInfo
              song={song}
              visible={this.state.showInfo}/>
            <AnnotationPrompt
              visible={this.state.showPrompt}
              closePrompt={this.closeAnnotationPrompt}
              handleClick={this.handlePromptClick} />
          </div>
        </div>
      </div>
    );
  }
});

module.exports = Song;
