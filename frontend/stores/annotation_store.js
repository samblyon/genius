const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationConstants = require('../constants/annotation_constants');

// NOTE ANNOTATIONS ARE STORED BY ID
let _annotations = {};
let _tempAnnotation;
let _lastAddedAnnotation = {};

const AnnotationStore = new Store(AppDispatcher);

AnnotationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AnnotationConstants.ANNOTATION_RECEIVED:
      _annotations[payload.annotation.id] = payload.annotation;
      _clearTempAnnotation();
      _lastAddedAnnotation = payload.annotation;
      this.__emitChange();
      break;
    case AnnotationConstants.ANNOTATIONS_RECEIVED:
      _resetAnnotations(payload.annotations);
      _tempAnnotation = null;
      this.__emitChange();
      break;
    case AnnotationConstants.ANNOTATION_REMOVED:
      delete _annotations[payload.annotation.id];
      this.__emitChange();
      break;
    case AnnotationConstants.STORE_TEMP_ANNOTATION:
      _tempAnnotation = payload.annotation;
      _annotations["temp"] = _tempAnnotation;
      this.__emitChange();
      break;
    case AnnotationConstants.CLEAR_TEMP_ANNOTATION:
      _clearTempAnnotation();
      this.__emitChange();
      break;
  }
};

AnnotationStore.find = function (id) {
  return _annotations[id];
};

AnnotationStore.all = function () {
  return Object.keys(_annotations)
    .map(id => {
      return _annotations[id];
    })
    .sort( (a, b) => a.start_index - b.start_index );
};

AnnotationStore.temp = function () {
  return _tempAnnotation;
};

AnnotationStore.lastAddedAnnotation = function () {
  return _lastAddedAnnotation;
};

function _resetAnnotations(annotations){
  _annotations = {};
  for (let annotation of annotations){
    _annotations[annotation.id] = annotation;
  }
}

function _clearTempAnnotation () {
  _tempAnnotation = null;
  delete _annotations["temp"];
}

module.exports = AnnotationStore;
