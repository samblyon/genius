const React = require('react');
const Link = require('react-router').Link;

const HeaderAuth = React.createClass({
  render(){
    return(
      <ul className="nav">
        <Link to="/signup">
          <li className="auth">
            Sign Up
          </li>
        </Link>

        <Link to="/login">
          <li className="auth">
            Login
          </li>
        </Link>
      </ul>
    );
  },
});

module.exports = HeaderAuth;
