const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const ErrorConstants = require('../constants/error_constants');

let _errors = {};
let _form = "";

const ErrorStore = new Store(AppDispatcher);

ErrorStore.__onDispatch = function(payload){
  switch (payload.actionType) {
    case ErrorConstants.SET_ERRORS:
      _setErrors(payload.formName, payload.errors);
      this.__emitChange();
      break;
    case ErrorConstants.CLEAR_ERRORS:
      _clearErrors();
      this.__emitChange();
      break;
  }
};

ErrorStore.formErrors = function(form){
  if (_form === form){
    return _errors;
  }
};

ErrorStore.form = function(){
  return _form;
};

function _setErrors (form, errors){
  _form = form;
  _errors = errors;
}

function _clearErrors (){
  _form = "";
  _errors = {};
}

module.exports = ErrorStore;
