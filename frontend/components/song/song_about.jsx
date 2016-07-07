const React = require('react');

const SongAbout = React.createClass({

  render() {
    let about;
    if (this.props.song.about) {
      about = this.props.song.about;
    }
    return (
      <div className="song-about">
        {about}
      </div>
    );
  }

});

module.exports = SongAbout;
