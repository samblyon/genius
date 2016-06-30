const AppDispatcher = require("../dispatcher/dispatcher");
const SessionApiUtil = require("../util/session_api_util");
const SessionConstants = require("../constants/session_constants");
const ErrorActions = require("../actions/error_actions");

module.exports = {
  signUp(user, formName){
    SessionApiUtil.signUp(
      user,
      this.receiveCurrentUser,
      ErrorActions.setErrors.bind(null, formName)
    );
  },

  login(user, formName){
    SessionApiUtil.login(
      user,
      this.receiveCurrentUser,
      ErrorActions.setLoginErrors.bind(null, formName)
    );
  },

  loginGuest(){
    SessionApiUtil.login(
      {
        username: "guest",
        password: "guestguest"
      },
      this.receiveCurrentUser,
      ErrorActions.setLoginErrors.bind(null, "login")
    );
  },

  logout(){
    SessionApiUtil.logout(this.removeCurrentUser, ErrorActions.onError);
  },

  receiveCurrentUser(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGIN,
      user: user
    });
  },

  removeCurrentUser(user){
    AppDispatcher.dispatch({
      actionType: SessionConstants.LOGOUT,
      user: {}
    });
  },
};
