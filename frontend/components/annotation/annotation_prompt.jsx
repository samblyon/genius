const React = require('react');

const AnnotationPrompt = React.createClass({
  render (){
    return (
      <div className="prompt">
        <button onClick={this.props.handleClick}>Annotate</button>
      </div>
    );
  }
});

module.exports = AnnotationPrompt;
