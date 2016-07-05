const React = require('react');
const SessionStore = require("../../stores/session_store");
const LoginForm = require('../auth/login_form');

const AnnotationPrompt = React.createClass({
  getInitialState() {
    return {
      loggedIn: SessionStore.isUserLoggedIn(),
      showLogin: false
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._onUserChange);
    if ( !this.state.loggedIn ) {
      document.getElementById('signup-button').addEventListener('click', (e)=>{
        this.revealLogin();
        console.log("stopping propogation");
        e.stopPropagation();
        e.preventDefault();
      });
    }
  },

  componentWillUnmount(){
    this.sessionListener.remove();
  },

  _onUserChange(){
    this.setState({ loggedIn: SessionStore.isUserLoggedIn() })
  },

  revealLogin(){
    console.log("clicked button to show login");
    this.setState({ showLogin: true });
  },

  render (){
    let promptContent;

    if (!this.state.loggedIn) {
      if (this.state.showLogin) {
        promptContent = <LoginForm />;
      } else {
        promptContent = (
          <div id="signup-button" onClick={this.revealLogin}>
            Signup to annotate
          </div>
        );
      }
    } else {
      promptContent = (
        <button id="annotation-button"
          onClick={this.props.handleClick}>
          Annotate
        </button>
      );
    }

    return (
      <div className="prompt" id="annotation-prompt">
        {promptContent}
      </div>
    );
  }
});

module.exports = AnnotationPrompt;
