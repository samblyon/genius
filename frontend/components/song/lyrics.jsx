const React = require('react');

const Lyrics = React.createClass({

  render() {
    return (
      <div class="lyrics">
        {this.props.lyrics}
      </div>
    );
  }

});

module.exports = Lyrics;
