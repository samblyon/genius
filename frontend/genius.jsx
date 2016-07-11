const React = require('react');
const ReactDOM = require('react-dom');

const Modal = require('react-modal');

const ReactRouter = require('react-router');
const Router = ReactRouter.Router;
const Route = ReactRouter.Route;
const IndexRoute = ReactRouter.IndexRoute;
const hashHistory = ReactRouter.hashHistory;

const Header = require('./components/header/header');
const SessionActions = require('./actions/session_actions');
const SessionStore = require('./stores/session_store');
const SongDisplay = require('./components/song/song_display');
const SongsIndex = require('./components/song/songs_index');
const Song = require('./components/song/song');
const SongForm = require('./components/song/song_form');
const Footer = require('./components/footer/footer')

const App = React.createClass({
  render() {
    return (
      <div>
        <Header />
        {this.props.children}
        <Footer />
      </div>
    );
  }
});

const AppRouter = (
  <Router history={hashHistory} onUpdate={() => window.scrollTo(0, 0)}>
    <Route path="/" component={App}>
      <IndexRoute component={SongDisplay} />
      <Route path="songs" component={SongsIndex} />
      <Route path="/songs/:songId" component={Song} />
      <Route path="/song/new" component={SongForm} />
    </Route>
  </Router>
);

document.addEventListener("DOMContentLoaded", () => {
  if (window.currentUser){
    SessionActions.receiveCurrentUser(window.currentUser);
  }

  const root = document.getElementById('content');
  Modal.setAppElement(document.body); //disable body when modal active
  ReactDOM.render(AppRouter, root);
});

function _ensureLoggedIn(){
  if (!SessionStore.currentUser().username){
    window.location = "/#/login";
  }
}
