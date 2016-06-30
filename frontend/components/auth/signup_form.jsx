const React = require('react');
const SessionActions = require('../../actions/session_actions');
const ErrorActions = require('../../actions/error_actions');
const SessionStore = require('../../stores/session_store');
const ErrorStore = require('../../stores/error_store');
const hashHistory = require('react-router').hashHistory;

const SignupForm = React.createClass({
  getInitialState() {
    return {
      username: "",
      password: "",
      passwordConfirmation: "",
      errors: {}
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._sessionChanged);
    this.errorListener = ErrorStore.addListener(this._errorsChanged);
    this.formName = "signup";
  },

  componentWillUnmount(){
    this.sessionListener.remove();
    this.errorListener.remove();
  },

  _sessionChanged(){
    const user = SessionStore.currentUser();
    if (user.username) {
      hashHistory.push("/");
    }
  },

  _errorsChanged(){
    this.setState({ errors: ErrorStore.formErrors("signup") });
  },

  handleUsernameChange(e){
    this.setState({ username: e.target.value });
  },

  handlePasswordChange(e){
    this.setState({ password: e.target.value });
  },

  handlePasswordConfirmationChange(e){
    this.setState({ passwordConfirmation: e.target.value });
  },

  handleSubmit(e){
    e.preventDefault();
    if (this.passwordsMatch()){
      const user = this.state;
      SessionActions.signUp(user, this.formName);
    } else {
      ErrorActions.setLocalErrors(
        "signup",
        {
          passwordConfirmation: ["Passwords don\'t match"]
        }
      );
    }
  },

  passwordsMatch(){
    return this.state.password === this.state.passwordConfirmation;
  },

  render() {
    return (
      <form onSubmit={this.handleSubmit} className="auth-form">
        <label>Username:
          <p className="form-error">{this.state.errors.username}</p>
          <input type="text"
                 value={this.state.username}
                 onChange={this.handleUsernameChange}>
          </input>
        </label>

        <label>Password:
          <p className="form-error">{this.state.errors.password}</p>
          <input type="password"
                 value={this.state.password}
                 onChange={this.handlePasswordChange}>
          </input>
        </label>

        <label>Confirm Password:
          <p className="form-error">{this.state.errors.passwordConfirmation}</p>
          <input type="password"
                 value={this.state.passwordConfirmation}
                 onChange={this.handlePasswordConfirmationChange}>
          </input>
        </label>

        <input value="Sign Up"
               type="submit"
               className="submit">
        </input>
      </form>
    );
  }
});

module.exports = SignupForm;
