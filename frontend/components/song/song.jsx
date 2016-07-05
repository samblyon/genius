const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const AnnotationStore = require('../../stores/annotation_store');
const AnnotationActions = require('../../actions/annotation_actions');
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
      showInfo: true,
      selectedAnnotationId: ""
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
    // refresh annotations for LyricsDisplay
    this.setState({
      annotations: AnnotationStore.all(),
    });

    // if there's a temp, tell the annotation component to use the temp
    // and set own mode to editing (for click listener)
    // otherwise, an annotation must have been added, so grab its id
    if ( AnnotationStore.temp() ) {
      this.tempAnnotation = AnnotationStore.temp();
      this.setState({
        selectedAnnotationId: "temp",
        editing: true
      });
    } else {
      this.setState({
        editing: false,
        selectedAnnotationId: AnnotationStore.lastAddedAnnotation().id
      });
    }
  },

  activateAnnotationPrompt(){
    this.setState({
      selectedAnnotationId: "prompt",
      showInfo: false
    });
    console.log("Activated listener");
    window.addEventListener("click", (event) => {
      // debugger;
      console.log("received click");
      if (event.target.id !== "annotation-prompt"
        && event.target.id !== "annotation-button"
        && event.target.id !== "signup-button"
        && event.target.id !== "signin-button"
        && this.state.selectedAnnotationId === "prompt"
      ){
        console.log("clicked outside");
        this.setState({
          showInfo: true,
          selectedAnnotationId: "",
          editing: false
        });
      }
    });
  },

  handleHighlightClick(e){
    this.setState({
      selectedAnnotationId: parseInt(e.target.id),
      showInfo: false
    });
  },

  afterSubmit(){
    this.setState({
      editing: false,
    });
  },

  handleCancelCreate(){
    this.setState({
      editing: false,
      selectedStart: "",
      selectedEnd: "",
      showInfo: true,
      selectedAnnotationId: ""
    });
    AnnotationActions.clearTemp();
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

  handleHighlight(e){
    const selection = window.getSelection();
    console.log(selection.anchorOffset, selection.focusOffset);
    this.setState({
      selectedStart: selection.anchorOffset,
      selectedEnd: selection.focusOffset
    });
    if ( this.state.editing === true ){
      return;
    } else if (
      selection.isCollapsed ||
      this.selectionOverlapping(selection.anchorOffset, selection.focusOffset)
    ) {
      this.setState({
        showInfo: true,
        selectedAnnotationId: ""
      });
    } else {
      this.activateAnnotationPrompt();
    }
  },

  render () {
    const song = this.state.song;
    const annotations = this.state.annotations;
    const selection = this.state.selectedAnnotationId;

    return (
      <div className="song">
        <SongSplash song={song} />
        <div className="not-splash">
          <div className="song-left-col">
            <LyricsDisplay
                song={song}
                annotations={annotations}
                selected={selection}
                onHighlight={this.handleHighlight}
                handleHighlightClick={this.handleHighlightClick} />
          </div>
          <div className="song-right-col">
            <SongInfo
              song={song}
              visible={this.state.showInfo}/>
            <Annotation
              selectedStart={this.state.selectedStart}
              selectedEnd={this.state.selectedEnd}
              tempAnnotation={this.tempAnnotation}
              afterSubmit={this.afterSubmit}
              handleCancelCreate={this.handleCancelCreate}
              annotationId={selection}
              songId={this.songId} />
          </div>
        </div>
      </div>
    );
  }

});

module.exports = Song;
