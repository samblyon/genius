const React = require('react');
const ReactDOM = require('react-dom');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const Header = require('./components/header');
const LoginForm = require('./components/login_form');
const SignupForm = require('./components/signup_form');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const SongActions = window.SongActions = require('./actions/song_actions');
const SongStore = window.SongStore = require('./stores/song_store');

// const SongsDisplay = require('./components/songs_display');

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
      </div>
    );
  }
});

const AppRouter = (
  <Router history={hashHistory}>
    <Route path="/" component={App}>
      <Route path="/login" component={LoginForm} />
      <Route path="/signup" component={SignupForm} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  if (window.currentUser){
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById('content');
  ReactDOM.render(AppRouter, root);
});

function _ensureLoggedIn(){
  if (!SessionStore.currentUser().username){
    window.location = "/#/login";
  }
}
