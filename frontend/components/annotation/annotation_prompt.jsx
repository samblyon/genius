const React = require('react');

const AnnotationPrompt = React.createClass({
  render (){
    const displayClass = (this.props.visible) ? "prompt" : "invisible";

    return (
      <div className={displayClass} id="annotation-prompt">
        <button id="annotation-button"
                onClick={this.props.handleClick}>
                Annotate
        </button>
      </div>
    );
  }
});

module.exports = AnnotationPrompt;

// if (this.props.visible) {
//   const prompt = document.getElementById('annotation-prompt');
//   prompt.addEventListener("click", (e)=>{
//     e.stopPropagation();
//   });
//   document.addEventListener("click", this.props.closePrompt);
// } else {
//   document.removeEventListener("click", this.props.closePrompt);
// }
