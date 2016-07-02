const React = require('react');

const Lyrics = React.createClass({
  handleClick(e){
    e.stopPropagation();
  },

  render() {
    return (
      <div>
        <div className="ghost-lyrics"
          id="ghost-lyrics"
          onMouseUp={this.props.onHighlight}
          onClick={this.handleClick}>
          {this.props.lyrics}
        </div>
        <div className="lyrics" id="lyrics">
          {this.props.populatedLyrics}
        </div>
      </div>
    );
  }
});

module.exports = Lyrics;

// dangerouslySetInnerHTML={{ __html: this.props.populatedLyrics }}>
