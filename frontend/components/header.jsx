const React = require('react');
const hashHistory = require('react-router').hashHistory;
const Link = require('react-router').Link;
const SessionStore = require('../stores/session_store');
const SessionActions = require('../actions/session_actions');

const Header = React.createClass({
  getInitialState() {
    return {
      currentUser: SessionStore.currentUser()
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._sessionChange);
  },

  _sessionChange(){
    this.setState({ currentUser: SessionStore.currentUser() });
  },

  goHome(){
    window.location = "/";
  },

  handleLogout(e){
    e.preventDefault();
    SessionActions.logout();
  },

  render(){
    const gateway = (
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

    const profile = (
      <ul className="nav">
        <button onClick={this.handleLogout} className="auth">
            Log Out
        </button>

        <li className="auth">
          Hi, {this.state.currentUser.email}!
        </li>
      </ul>
    );

    let authOrProfile = (this.state.currentUser.email) ? profile : gateway;

    return(
      <header>
        <section className="logo" onClick={this.goHome}></section>
        {authOrProfile}
      </header>
    );
  }
});

module.exports = Header;
