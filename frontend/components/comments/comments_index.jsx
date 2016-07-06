const React = require('react');

const CommentsIndex = React.createClass({
  render(){
    const items = this.props.comments.map(comment => {
      return <CommentsIndexItem key={comment.id} comment={comment} />;
    });

    return(
      <div>
        Comments index!
        {items}
      </div>
    );
  }

});

module.exports = CommentsIndex;
