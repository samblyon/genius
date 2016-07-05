const React = require('react');
const AnnotationActions = require('../../actions/annotation_actions');
const AnnotationStore = require('../../stores/annotation_store');

const AnnotationForm = React.createClass({
  getInitialState() {
    return {
      body: this.props.annotation.body,
      submitting: false,
      errors: {}
    };
  },

  handleBodyChange(e){
    this.setState({
      body: e.target.value
    });
  },

  handleSubmit(e){
    if (this.state.body) {
      const annotation = this.props.annotation;
      annotation.body = this.state.body;
      if (this.props.editing) {
        AnnotationActions.updateAnnotation(annotation, "editAnnotation");
      } else {
        AnnotationActions.createAnnotation(annotation, "editAnnotation");
      }
      this.setState({ submitting: true });
    } else {
      this.setState({ errors: { body: "Go ahead, write something."} });
    }
  },

  render () {
    return (
      <form className="annotation annotation-form">
        <p className="form-error">{this.state.errors.body}</p>
        <textarea
          className="annotation-textarea"
          defaultValue={this.state.body}
          onChange={this.handleBodyChange}>
        </textarea>
        <button
          className="save-button"
          disabled={this.state.submitting}
          onClick={this.handleSubmit}>
            Save
        </button>
        <button
          className="cancel-button"
          disabled={this.state.submitting}
          onClick={this.props.handleCancelCreate}>
            Nevermind
        </button>
      </form>
    );
  }
});

module.exports = AnnotationForm;
