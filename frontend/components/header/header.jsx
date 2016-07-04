const React = require('react');
const Link = require('react-router').Link;
const hashHistory = require('react-router').hashHistory;
const Modal = require('react-modal');
const SessionStore = require('../../stores/session_store');
const SessionActions = require('../../actions/session_actions');
const HeaderUserProfile = require('./header_user_profile');
const HeaderAuth = require('./header_auth');
const SearchBar = require('./search_bar');
const SongForm = require('../song/song_form');


const Header = React.createClass({
  getInitialState() {
    return {
      currentUser: SessionStore.currentUser(),
      modalOpen: false
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

  closeModal(e){
    if (e) {
      e.preventDefault();
    }
    this.setState({ modalOpen: false });
  },

  openModal(e){
    e.preventDefault();
    this.setState({ modalOpen: true });
  },

  render(){
    let authOrProfile;
    if (this.state.currentUser.username) {
      authOrProfile = <HeaderUserProfile
                currentUser={this.state.currentUser}
                handleLogout={this.handleLogout} />;
    } else {
      authOrProfile = <HeaderAuth />;
    }

    const modalStyle = {
      overlay : {
        position        : 'fixed',
        top             : 0,
        left            : 0,
        right           : 0,
        bottom          : 0,
        backgroundColor : 'rgba(255, 255, 255, 0)',
        zIndex          : 10
      },
      content : {
        position        : 'relative',
        justifyContent : 'center',
        top             : '80px',
        left            : '0%',
        width           : '100%',
        height          : '400px',
        border          : 'none',
        padding         : '20px',
        backgroundColor : '#ff1464',
        borderRadius   : '0px',
        zIndex          : 11
      }
    };

    return(
      <div className="header">
        <header className="header-top">
          <SearchBar />
          <div className="logo-container" onClick={this.goHome}></div>
          {authOrProfile}
        </header>
        <nav className="header-nav">
          <Link to="/" className="nav-link">HOME</Link>
          <a onClick={this.openModal} className="nav-link">ADD SONG</a>
          <Link to="/songs" className="nav-link">ALL SONGS</Link>
          <Modal isOpen={this.state.modalOpen}
            onRequestClose={this.closeModal}
            style={modalStyle}>
            <SongForm closeModal={this.closeModal}/>
          </Modal>
        </nav>
      </div>
    );
  }
});

module.exports = Header;
