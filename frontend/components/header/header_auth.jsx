const React = require('react');
const Link = require('react-router').Link;

const HeaderAuth = React.createClass({
  render(){
    return(
      <ul className="auth-nav">
        <Link to="/signup">
          <li className="auth">
            SIGN UP
          </li>
        </Link>

        <Link to="/login">
          <li className="auth">
            SIGN IN
          </li>
        </Link>
      </ul>
    );
  },
});

module.exports = HeaderAuth;
