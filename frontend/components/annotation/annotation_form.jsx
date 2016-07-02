const React = require('react');

const AnnotationForm = React.createClass({
  getInitialState() {
    return {
      body: "test",
      startIndex: this.props.startIndex,
      endIndex: this.props.endIndex
    };
  },

  handleBodyChange(e){
    this.setState({
      body: e.target.value
    });
  },

  render () {
    return (
      <form className="annotation-form">
        <textarea
          className="annotation-textarea"
          defaultValue={this.state.body}
          onChange={this.handleBodyChange}>
        </textarea>
        <button onClick={this.handleSubmit}>Submit</button>
      </form>
    );
  }
});

module.exports = AnnotationForm;
