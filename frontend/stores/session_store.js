const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const SessionConstants = require('../constants/session_constants');

let _currentUser = {};

const SessionStore = new Store(AppDispatcher);

SessionStore.__onDispatch = function (payload){
  switch (payload.actionType) {
    case SessionConstants.LOGIN:
      _login(payload.user);
      this.__emitChange();
      break;
    case SessionConstants.LOGOUT:
      _logout();
      this.__emitChange();
      break;
  }
};

SessionStore.currentUser = function(){
  return _currentUser;
};

SessionStore.isUserLoggedIn = function(){
  return (_currentUser.username) ? true : false;
};

function _login (user){
  _currentUser = user;
}

function _logout(){
  _currentUser = {};
  window.location.reload(true);
}

module.exports = SessionStore;
