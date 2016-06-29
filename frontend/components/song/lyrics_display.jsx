const React = require('react');
const Lyrics = require('./lyrics');

const LyricsDisplay = React.createClass({

  render() {
    return (
      <div class="lyrics-display">
        <Lyrics lyrics={this.props.song.lyrics} />
      </div>
    );
  }

});

module.exports = LyricsDisplay;
