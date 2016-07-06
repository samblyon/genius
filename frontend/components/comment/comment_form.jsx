const React = require('react');
const CommentActions = require('../../actions/comment_actions');
const AnnotationStore = require('../../stores/annotation_store');
const SongStore = require('../../stores/song_store');

const CommentForm = React.createClass({
  getInitialState() {
    return {
      body: "",
      editing: false,
      submitting: false
    };
  },

  componentDidMount(){
    if (this.props.annotation) {
      this.annotationListener = AnnotationStore.addListener(
        this._onStoreChange
      );
    } else if (this.props.song) {
      this.listener = SongStore.addListener(
        this._onStoreChange
      );
    }
  },

  componentWillUnmount(){
    this.annotationListener.remove();
  },

  _onStoreChange(){
    this.setState({
      body: "",
      submitting: false,
      editing: false
    });
  },

  handleChange(e){
    e.preventDefault();
    this.setState({ body: e.target.value })
    if (e.target.value !== "") {
      this.setState({ editing: true });
    } else {
      this.setState({ editing: false });
    }
  },

  handleSubmit(e){
    e.preventDefault();
    const comment = {
      body: this.state.body
    }

    if (this.props.annotation) {
      comment.annotation_id = this.props.annotation.id;
    } else if (this.props.song) {
      comment.song_id = this.props.song.id;
    }

    CommentActions.createComment(comment);

    this.setState({ submitting: true })
  },

  handleCancelCreate(e){
    e.preventDefault();
    this.replaceState( this.getInitialState() );
  },

  render(){
    const buttonGroup = (this.state.editing) ? "" : "invisible";

    return (
      <form className="annotation-form comment-form clearfix">
        <textarea
          value={this.state.body}
          placeholder="Add comment..."
          onChange={this.handleChange} />
        <div className={buttonGroup}>
          <input
            className="submit"
            type="submit"
            value="Submit"
            onClick={this.handleSubmit} />
          <button
            className="cancel-button"
            onClick={this.handleCancelCreate}>Nevermind</button>
        </div>
      </form>
    );
  }
});

module.exports = CommentForm;
