const React = require('react');
const AnnotationStore = require("../../stores/annotation_store");
const AnnotationActions = require("../../actions/annotation_actions");
const AnnotationForm = require("./annotation_form");
const AnnotationPrompt = require("./annotation_prompt");
const SessionStore = require("../../stores/session_store");

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
  },

  _onAnnotationsChange(){
    this.afterSubmit();
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
    } else if (command) {
      const form = (
        <AnnotationForm
          annotation={AnnotationStore.find(command)}
          afterSubmit={this.afterSubmit}
          handleCancelCreate={this.handleCancelEdit}
          editing="true"/>
      );

      let editButton;
      if (
        SessionStore.isUserLoggedIn() &&
        this.state.annotation.author_id === SessionStore.currentUser().id
      ) {
        editButton = (
          <button onClick={this.switchToEditingMode}>
            Edit
          </button>
        );
      }

      const view = (
        <div className="annotation-view">
          {this.state.annotation.body}
          <div>{ (editButton) ? editButton : "" }</div>
        </div>
      );

      let formOrView = view;
      if (this.state.editing) {
        formOrView = form;
      }

      annotationSegment = (
        <div className="annotation">
          {formOrView}
          <div>
            Comments will go here
          </div>
        </div>
      );
    }

    return (
      <div id="annotation-segment"
        className="annotation-segment"
        style={this.props.popupStyle}>
        {annotationSegment}
      </div>
    );
  }
});

module.exports = Annotation;
