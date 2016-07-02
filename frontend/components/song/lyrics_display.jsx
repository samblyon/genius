const React = require('react');
const Lyrics = require('./lyrics');

const LyricsDisplay = React.createClass({

  render() {
    return (
      <div class="lyrics-display">
        <Lyrics populatedLyrics={this.props.populatedLyrics}
          lyrics={this.props.song.lyrics}
          onHighlight={this.props.onHighlight}/>
      </div>
    );
  }

});

module.exports = LyricsDisplay;
