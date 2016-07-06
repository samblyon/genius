const React = require('react');
const AnnotationStore = require("../../stores/annotation_store");
const AnnotationActions = require("../../actions/annotation_actions");
const AnnotationForm = require("./annotation_form");
const AnnotationPrompt = require("./annotation_prompt");
const SessionStore = require("../../stores/session_store");
const CommentForm = require("../comment/comment_form");
const CommentsIndex = require("../comment/comments_index");

const Annotation = React.createClass({
  getInitialState(){
    return({
      annotation: AnnotationStore.find(this.props.annotationId),
      editing: false
    });
  },

  componentDidMount(){
    this.annotationListener = AnnotationStore.addListener(
      this._onAnnotationsChange
    );
  },

  componentWillUnmount(){
    this.annotationListener.remove();
  },

  componentWillReceiveProps(newProps) {
    this.setState({
      annotation: AnnotationStore.find(newProps.annotationId)
    });
    if (newProps.annotationId !== this.props.annotationId) {
      this.callForAnnotationIfAppropriate(newProps.annotationId);
    }
  },

  _onAnnotationsChange(){
    this.afterSubmit();
  },

  callForAnnotationIfAppropriate(annotationId){
    if (annotationId) {
      if ((annotationId !== "prompt") && (annotationId !== "temp")) {
        AnnotationActions.fetchSingleAnnotation(parseInt(annotationId));
      }
    }
  },

  handlePromptClick(){
    AnnotationActions.createTempAnnotation({
      start_index: this.props.selectedStart,
      end_index: this.props.selectedEnd,
      body: "Write something interesting...",
      song_id: this.props.songId,
      id: "temp"
    });
  },

  switchToEditingMode(e){
    e.preventDefault();
    this.setState({editing: true});
  },

  afterSubmit(){
    this.setState({
      editing: false
    });
    this.props.afterSubmit();
  },

  handleCancelEdit(){
    this.setState({ editing: false });
  },

  handleDelete(){
    AnnotationActions.destroyAnnotation(this.props.annotationId);
  },

  render () {
    const command = this.props.annotationId;
    let annotationSegment = <div></div>;
    if (command === "prompt") {
      annotationSegment = (
        <AnnotationPrompt
          handleClick={this.handlePromptClick} />
      );
    } else if (command === "temp") {
      annotationSegment = (
        <AnnotationForm
          popupStyle={this.props.popupStyle}
          annotation={this.props.tempAnnotation}
          handleCancelCreate={this.props.handleCancelCreate} />
      );
    } else if (command && this.state.annotation) {
      const form = (
        <AnnotationForm
          annotation={AnnotationStore.find(command)}
          afterSubmit={this.afterSubmit}
          handleCancelCreate={this.handleCancelEdit}
          editing="true"/>
      );

      let userButtons;
      if (
        SessionStore.isUserLoggedIn() &&
        this.state.annotation.author_id === SessionStore.currentUser().id
      ) {
        userButtons = (
          <div>
            <button className="edit-button"
              onClick={this.switchToEditingMode}>
              Edit
            </button>
            <button className="cancel-button"
              onClick={this.handleDelete}>
              Delete
            </button>
          </div>
        );
      }

      const view = (
        <div className="annotation-view clearfix">
          <span className="annotation-author">
            {this.state.annotation.author}
          </span>
          {this.state.annotation.body}
          { (userButtons) ? userButtons : "" }
        </div>
      );

      let formOrView = view;
      if (this.state.editing) {
        formOrView = form;
      }

      annotationSegment = (
        <div className="annotation">
          {formOrView}
          <div className="comments clearfix">
            <CommentForm annotation={this.state.annotation} />
          </div>
        </div>
      );
    }

    return (
      <div id="annotation-segment"
        className="annotation-segment clearfix"
        style={this.props.popupStyle}>
        {annotationSegment}
      </div>
    );
  }
});

module.exports = Annotation;
