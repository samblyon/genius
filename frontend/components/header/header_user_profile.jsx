const React = require('react');

const HeaderUserProfile = React.createClass({
  render(){
    return(
      <ul className="auth-nav">

        <li className="auth">
          Hi, {this.props.currentUser.username}!

          <div className="user-dropdown">
            <ul>
              <li>
                Welcome to So-Genius
              </li>
              <li onClick={this.props.handleLogout} className="auth">
                Log Out
              </li>
            </ul>
          </div>
        </li>
      </ul>
    );
  }
});

module.exports = HeaderUserProfile;
