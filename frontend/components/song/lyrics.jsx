const React = require('react');

const Lyrics = React.createClass({
  getInitialState() {
    return {
      spacerStyle: { height: '900px' }
    };
  },

  resize(){
    const newHeight = document.getElementById('lyrics').clientHeight;
    this.setState({
      spacerStyle: { height: newHeight + 'px' }
    });
  },

  componentDidMount() {
    setTimeout(this.resize, 400);
    window.addEventListener('resize', this.resize);
  },

  componentWillReceiveProps(){
    setTimeout(this.resize, 400);
  },

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  },

  handleClick(e){
    e.stopPropagation();
  },

  render() {
    return (
      <div>
        <div className="ghost-lyrics" ref="ghost"
          id="ghost-lyrics"
          onMouseUp={this.props.onHighlight}
          onClick={this.handleClick}>
          {this.props.lyrics}
        </div>
        <div className="lyrics" id="lyrics" ref="lyrics">
          {this.props.populatedLyrics}
        </div>
        <div style={this.state.spacerStyle}></div>
      </div>
    );
  }
});

module.exports = Lyrics;

// dangerouslySetInnerHTML={{ __html: this.props.populatedLyrics }}>
