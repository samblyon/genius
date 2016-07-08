const React = require('react');
const Dropzone = require('react-dropzone');
const Cloudinary = require('cloudinary');

const Uploader = React.createClass({
    getInitialState() {
      Cloudinary.config({
        cloud_name: window.CLOUDINARY_OPTIONS.cloud_name,
        api_key: window.CLOUDINARY_OPTIONS.api_key,
        api_secret: window.CLOUDINARY_OPTIONS.api_secret
      });

      return {
        file: null
      };
    },

    handleClick(e) {
      e.preventDefault();
      cloudinary.openUploadWidget(CLOUDINARY_OPTIONS, function(error, results){
        if(!error){
          console.log(results[0]);
          // this.postImage(results[0]);
        }
      }.bind(this));
    },

    postImage(image){
      const song = {
        id: this.props.songId,
        album_cover: image.secure_url
      }
      SongActions.updateSong(song);
    },

    render() {
      return (
        <div className="player-box uploader" onClick={this.handleClick}>
          <div className="uploader-text">
            Upload an album cover
          </div>
        </div>
      );
    }
});

module.exports = Uploader;


// <Dropzone
//   onDrop={this.onDrop}
//   className="player-box uploader"
//   multiple={false}>
// </Dropzone>
