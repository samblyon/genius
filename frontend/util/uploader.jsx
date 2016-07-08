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
          this.props.post(results[0]);
        }
      }.bind(this));
    },

    render() {
      return (
        <button className="upload-button" onClick={this.handleClick}>
          Upload an album cover
        </button>
      );
    }
});

module.exports = Uploader;
