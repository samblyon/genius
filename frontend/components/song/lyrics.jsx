const React = require('react');

const Lyrics = React.createClass({
  componentDidUpdate(){
    const lyrics = document.querySelector(".lyrics");
    if (lyrics) {
      if (lyrics.children.length > 0) {
        const links = Array.prototype.slice.apply(lyrics.children);
        links.forEach(link => {
          link.addEventListener("click", (e) => { alert(e.target.id); });
        });
      }
    }
  },
  render() {
    return (
      <div>
        <div className="ghost-lyrics" id="ghost-lyrics" onMouseUp={this.props.onHighlight}>
          {this.props.lyrics}
        </div>
        <div className="lyrics" id="lyrics"
          dangerouslySetInnerHTML={{ __html: this.props.populatedLyrics }}>
        </div>
      </div>
    );
  }
});

module.exports = Lyrics;
