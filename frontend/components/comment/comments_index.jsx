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
    if (this.props.comments) {
      items = this.props.comments.map(comment => {
        return(
          <CommentsIndexItem
            key={comment.id}
            comment={comment}
            handleDelete={this.handleDelete} />
        );
      });
    }

    return(
      <div className="comments-index">
        {items}
      </div>
    );
  }

});

module.exports = CommentsIndex;
