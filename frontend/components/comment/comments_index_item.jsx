const React = require('react');
const SessionStore = require('../../stores/session_store');

const CommentsIndexItem = React.createClass({
  render(){
    let userButton;
    if (
      SessionStore.isUserLoggedIn() &&
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
        <div className="comment-author">{this.props.comment.author}</div>
        <div className="comment-body">{this.props.comment.body}</div>
        {userButton}
      </div>
    );
  }
});

module.exports = CommentsIndexItem;
