const React = require('react');

const SongAbout = React.createClass({

  render() {
    return (
      <div class="song-about">
        {this.props.song.about}
      </div>
    );
  }

});

module.exports = SongAbout;
