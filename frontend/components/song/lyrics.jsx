const React = require('react');

const Lyrics = React.createClass({
  render() {
    return (
      <div>
        <div className="ghost-lyrics" id="ghost-lyrics" onMouseUp={this.props.onHighlight}>
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
