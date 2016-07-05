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
  },

  componentWillUnmount(){
    this.sessionListener.remove();
  },

  _onUserChange(){
    this.setState({ loggedIn: SessionStore.isUserLoggedIn() });
  },

  revealLogin(){
    console.log("clicked button to show login");
    this.setState({ showLogin: true });
  },

  render (){
    let promptContent;

    if (!this.state.loggedIn) {
      if (this.state.showLogin) {
        promptContent = (
          <div id="annotation-login"
            className="annotation annotation-login">
            <LoginForm />
          </div>
        );
      } else {
        promptContent = (
          <div id="annotation-signup-button"
            className="annotation annotation-prompt"
            onClick={this.revealLogin}>
            Signup or login to annotate
          </div>
        );
      }
    } else {
      promptContent = (
        <button id="annotation-button"
          className="annotation annotation-prompt"
          onClick={this.props.handleClick}>
          Click to Annotate
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
