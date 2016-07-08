const React = require('react');

const SongAbout = React.createClass({

  render() {
    let about;
    if (this.props.song.about) {
      about = this.props.song.about;
    }
    return (
      <div className="song-about">
        <h3>About {this.props.song.title}</h3>
        {about}
      </div>
    );
  }

});

module.exports = SongAbout;
