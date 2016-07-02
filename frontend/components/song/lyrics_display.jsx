const React = require('react');
const Lyrics = require('./lyrics');

const LyricsDisplay = React.createClass({
  populatedLyrics(){
    if (this.props.annotations.length === 0 || !this.props.song.lyrics) {
      return [];
    }

    const lyrics = this.props.song.lyrics;
    const lyricsEls = [];

    let tracked = 0;
    for (let annotation of this.props.annotations) {
      lyricsEls.push(
        lyrics.slice(tracked, annotation.start_index)
      );
      lyricsEls.push(
        <a onClick={this.props.handleHighlightClick}
           key={annotation.id}
           id={annotation.id}
           className="highlight"
           >{lyrics.slice(annotation.start_index, annotation.end_index)}
        </a>
      );
      tracked = annotation.end_index;
    }
    lyricsEls.push(lyrics.slice(tracked));
    return lyricsEls;
  },

  render() {
    return (
      <div class="lyrics-display">
        <Lyrics populatedLyrics={this.populatedLyrics()}
          lyrics={this.props.song.lyrics}
          onHighlight={this.props.onHighlight}/>
      </div>
    );
  }

});

module.exports = LyricsDisplay;
