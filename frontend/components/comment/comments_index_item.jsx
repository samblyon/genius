const React = require('react');
const SessionStore = require('../../stores/session_store');
const VoteForm = require('../vote/vote_form');

const CommentsIndexItem = React.createClass({
  getInitialState() {
    return {
      loggedIn: SessionStore.isUserLoggedIn()
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._onSessionChange);
  },

  componentWillUnmount(){
    this.sessionListener.remove();
  },

  _onSessionChange(){
    this.setState({
      loggedIn: SessionStore.isUserLoggedIn()
    });
  },

  render(){
    let userButton;
    if (
      this.state.loggedIn &&
      this.props.comment.author_id === SessionStore.currentUser().id
    ) {
      userButton = (
        <button className="cancel-button"
          onClick={this.props.handleDelete.bind(null, this.props.comment.id)}>
          Delete
        </button>
      );
    }

    return(
      <div className="comment clearfix">
        <div className="comment-container clearfix">
          <div className="comment-content">
            <div className="comment-author">{this.props.comment.author}</div>
            <div className="comment-body">{this.props.comment.body}</div>
          </div>
          {userButton}
        </div>
        <VoteForm subject={this.props.comment} votes={this.props.comment.votes} />
      </div>
    );
  }
});

module.exports = CommentsIndexItem;
