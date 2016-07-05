const React = require('react');
const SessionStore = require("../../stores/session_store");
const LoginForm = require('../auth/login_form');
const SignupForm = require('../auth/signup_form');

const AnnotationPrompt = React.createClass({
  getInitialState() {
    return {
      loggedIn: SessionStore.isUserLoggedIn(),
      showForm: ""
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

  revealLogin(e){
    e.preventDefault();
    this.setState({ showForm: "login" });
    e.stopPropagation();
  },

  revealSignup(e){
    e.preventDefault();
    this.setState({ showForm: "signup" });
    e.stopPropagation();
  },

  render (){
    let promptContent;

    if (!this.state.loggedIn) {
      if (this.state.showForm === "login") {
        promptContent = (
          <div id="annotation-login"
            className="annotation annotation-login">
            <LoginForm />
          </div>
        );
      } else if (this.state.showForm === "signup") {
        promptContent = (
          <div id="annotation-login"
            className="annotation annotation-login">
            <SignupForm />
          </div>
        );
      } else {
        promptContent = (
          <div id="annotation-signup-button"
            className="annotation annotation-prompt">
            <a className="signup" onClick={this.revealSignup}>Signup</a>
            <span className="dividing-text">or</span>
            <a onClick={this.revealLogin}>Login</a>
            <span className="dividing-text">to annotate</span>
          </div>
        );
      }
    } else {
      promptContent = (
        <button id="annotation-button"
          className="annotation annotation-button"
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
