const React = require('react');

const HeaderUserProfile = React.createClass({
  render(){
    return(
      <ul className="auth-nav">
        <button onClick={this.props.handleLogout} className="auth">
          Log Out
        </button>

        <li className="auth">
          Hi, {this.props.currentUser.username}!
        </li>
      </ul>
    );
  }
});

module.exports = HeaderUserProfile;
