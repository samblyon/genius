const React = require('react');

const Footer = React.createClass({
  render(){
    return(
      <div className="footer">
        Like what you see? Contact me: 
        <ul>
          <li><a href="https://www.linkedin.com/in/samuellyon">LinkedIn</a></li>
          <li><a href="https://github.com/samblyon">github</a></li>
        </ul>
      </div>
    )
  }
});

module.exports = Footer;
