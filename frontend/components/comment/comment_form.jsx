const React = require('react');
const CommentActions = require('../../actions/comment_actions');
const AnnotationStore = require('../../stores/annotation_store');
const SongStore = require('../../stores/song_store');
const SessionStore = require('../../stores/session_store');
const CommentPrompt = require('./comment_prompt');

const CommentForm = React.createClass({
  getInitialState() {
    return {
      body: "",
      editing: false,
      submitting: false,
      loggedIn: SessionStore.isUserLoggedIn()
    };
  },

  componentDidMount(){
    if (this.props.annotation) {
      this.parentListener = AnnotationStore.addListener(
        this._onStoreChange
      );
    } else if (this.props.song) {
      this.parentlistener = SongStore.addListener(
        this._onStoreChange
      );
    }

    this.sessionListener = SessionStore.addListener(this._onSessionChange);
  },

  componentWillUnmount(){
    this.parentListener.remove();
    this.sessionListener.remove();
  },

  _onStoreChange(){
    this.setState({
      body: "",
      submitting: false,
      editing: false
    });
  },

  _onSessionChange(){
    this.setState({
      loggedIn: SessionStore.isUserLoggedIn()
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
    const buttonGroupViewClass = (this.state.editing) ? "" : "invisible";

    const buttonGroup = (
      <div className={buttonGroupViewClass}>
        <input
          className="submit"
          type="submit"
          value="Submit"
          onClick={this.handleSubmit} />
        <button
          className="cancel-button"
          onClick={this.handleCancelCreate}>Nevermind</button>
      </div>
    );

    const prompt = (
      <div className={buttonGroupViewClass}>
        <CommentPrompt />
      </div>
    );

    let loginOrButtonGroup;
    if (this.state.loggedIn) {
      loginOrButtonGroup = buttonGroup;
    } else {
      loginOrButtonGroup = prompt;
    }

    return (
      <div className="annotation-form comment-form clearfix">
        <textarea
          value={this.state.body}
          placeholder="Add comment..."
          onChange={this.handleChange} />
        {loginOrButtonGroup}
      </div>
    );
  }
});

module.exports = CommentForm;
