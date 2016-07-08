const React = require('react');
const SongStore = require('../../stores/song_store');
const SongActions = require('../../actions/song_actions');
const AnnotationStore = require('../../stores/annotation_store');
const AnnotationActions = require('../../actions/annotation_actions');
const Annotation = require('../annotation/annotation');
const SongSplash = require('./song_splash');
const SongInfo = require('./song_info');
const LyricsDisplay = require('./lyrics_display');
const CommentsIndex = require('../comment/comments_index');
const CommentForm = require('../comment/comment_form');
const Player = require('./player');

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
    this.annotationListener = AnnotationStore.addListener(
      this._onAnnotationChange
    );
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
    this.replaceState( this.getInitialState() );
  },

  _onSongChange(){
    this.setState({ song: SongStore.find(this.songId) });
  },

  _onAnnotationChange(){
    // refresh annotations for LyricsDisplay
    this.setState({
      annotations: AnnotationStore.all(),
    });

    // if there's a temp, use temp and go into edit mode
    // if annotation has just been added, select it
    if ( AnnotationStore.temp() ) {
      this.tempAnnotation = AnnotationStore.temp();
      this.setState({
        selectedAnnotationId: "temp",
        editing: true
      });
    } else if (AnnotationStore.lastAddedAnnotation()) {
      this.setState({
        selectedAnnotationId: AnnotationStore.lastAddedAnnotation().id,
        editing: false
      });
    }
  },

  activateAnnotationPrompt(){
    this.setState({
      selectedAnnotationId: "prompt",
      showInfo: false
    });
    window.addEventListener("click", (event) => {
      if (!$(event.target).closest('#annotation-prompt').length
        && this.state.selectedAnnotationId === "prompt"
      ){
        this.setState({
          showInfo: true,
          selectedAnnotationId: "",
          editing: false
        });
      }
    });
  },

  handleHighlightClick(e){
    const element = e.target;
    this.setState({
      popupStyle: this.heightOfElement(element),
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
    return(
      this.state
        .annotations
        .some(annotation => {
          return !(
            endIdx < annotation.start_index
              || startIdx > annotation.end_index
          );
        })
    );
  },

  handleHighlight(e){
    const selection = window.getSelection();
    const indices = [selection.anchorOffset, selection.focusOffset];
    const sortedIndices = indices.sort((a, b) => a - b);
    this.setState({
      selectedStart: sortedIndices[0],
      selectedEnd: sortedIndices[1]
    });
    if ( this.state.editing === true ){
      return;
    } else if (
      selection.isCollapsed
      || this.selectionOverlapping(...sortedIndices)
    ) {
      this.setState({
        showInfo: true,
        selectedAnnotationId: ""
      });
    } else {
      const element = selection.getRangeAt(0);
      this.setState({ popupStyle: this.heightOfElement(element) });
      this.activateAnnotationPrompt();
    }
  },

  //returns object with top set to top of selection
  heightOfElement(element){
    const style = {};
    const relative = document.body.parentNode.getBoundingClientRect();
    const r = element.getBoundingClientRect();
    // this will get top of the selection (300 is custom adjustment,
    // due to the popup that uses this location sitting inside another
    // div)
    style.top = (r.top - relative.top - 310) + 'px';
    return style;
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
            <div className="annotation comments clearfix">
              <CommentForm song={song} />
              <CommentsIndex comments={song.comments} />
            </div>
          </div>
          <div className="song-right-col">
            <Player
              albumCover={song.album_cover}
              youtubeUrl={song.youtube_url} />
            <SongInfo
              song={song}
              visible={this.state.showInfo}/>
            <Annotation
              popupStyle={this.state.popupStyle}
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
