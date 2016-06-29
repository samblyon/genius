const ErrorConstants = require('../constants/error_constants');
const AppDispatcher = require('../dispatcher/dispatcher');

module.exports = {
  setErrors(formName, errors){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: errors.responseJSON.errors,
      formName: formName
    });
  },

  setSongErrors(formName, errors){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: errors.responseJSON,
      formName: formName
    });
  },

  setLoginErrors(formName, error){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: {errors: "Invalid username or password"},
      formName: formName
    });
  },

  setLocalErrors(formName, errors){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.SET_ERRORS,
      errors: errors,
      formName: formName
    });
  },

  clearErrors(){
    AppDispatcher.dispatch({
      actionType: ErrorConstants.CLEAR_ERRORS,
    });
  },

  onError(error){
    console.log(error);
  }
};
