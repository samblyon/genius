const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const HeaderUserProfile = require('./header_user_profile');
const HeaderAuth = require('./header_auth');

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
    let authOrProfile;
    if (this.state.currentUser.email) {
      authOrProfile = <HeaderUserProfile
                currentUser={this.state.currentUser}
                handleLogout={this.handleLogout} />;
    } else {
      authOrProfile = <HeaderAuth />;
    }

    return(
      <div className="header">
        <header className="header-top">
          <div className="search-placeholder">Search</div>
          <div className="logo-container" onClick={this.goHome} />
          {authOrProfile}
        </header>
        <nav className="header-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <Link to="/song/new" className="nav-link">ADD SONG</Link>
          <Link to="/songs" className="nav-link">ALL SONGS</Link>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
