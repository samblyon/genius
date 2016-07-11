const React = require('react');

const Footer = React.createClass({
  render(){
    return(
      <div className="footer">
        <div>so-genius</div>
        <ul>
          <li>Developer contact:</li>
          <li className="contact"><a href="https://www.linkedin.com/in/samuellyon">LinkedIn</a></li>
          <li className="contact"><a href="https://github.com/samblyon">github</a></li>
        </ul>
      </div>
    )
  }
});

module.exports = Footer;
