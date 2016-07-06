const React = require('react');
const CommentsIndexItem = require('./comments_index_item');
const CommentActions = require('../../actions/comment_actions');

const CommentsIndex = React.createClass({
  handleDelete(id, e){
    e.preventDefault();
    CommentActions.destroyComment(id);
  },

  render(){
    let items;
    let header;
    if (this.props.comments && this.props.comments.length > 0) {
      items = this.props.comments.map(comment => {
        return(
          <CommentsIndexItem
            key={comment.id}
            comment={comment}
            handleDelete={this.handleDelete} />
        );
      });
      header = (
        <div>
          <div className="separator" />
          <h3>Comments</h3>
        </div>
      );
    }

    return(
      <div className="comments-index">
        {header}
        {items}
      </div>
    );
  }

});

module.exports = CommentsIndex;
