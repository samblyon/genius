const React = require('react');
const Link = require('react-router').Link;

const HeaderAuth = React.createClass({
  render(){
    return(
      <ul className="auth-nav">
        <Link to="/signup">
          <li className="auth">
            Sign Up
          </li>
        </Link>

        <Link to="/login">
          <li className="auth">
            Sign In
          </li>
        </Link>
      </ul>
    );
  },
});

module.exports = HeaderAuth;
