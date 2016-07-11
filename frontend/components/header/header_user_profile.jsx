const React = require('react');

const HeaderUserProfile = React.createClass({
  render(){
    return(
      <ul className="auth-nav">

        <li className="auth">
          welcome, {this.props.currentUser.username}!

          <div className="user-dropdown">
            <ul>
              <li onClick={this.props.handleLogout}>
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
