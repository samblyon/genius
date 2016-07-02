const React = require('react');

const Annotation = React.createClass({
  render () {
    if (this.props.annotation.author_id === window.currentUser.id) {
      const editLink = "api/annotations/" + this.props.id;
      const button = <button to={editLink}>Edit</button>;
    }
    return (
      <div className="annotation">
        <div className="annotation-body">{this.props.body}</div>
        { (button) ? button : undefined }
      </div>
    );
  }
});

module.exports = Annotation;
