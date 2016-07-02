const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationConstants = require('../constants/annotation_constants');

// NOTE ANNOTATIONS ARE STORED BY ID
let _annotations = {};
let _tempAnnotation;

const AnnotationStore = new Store(AppDispatcher);

AnnotationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AnnotationConstants.ANNOTATION_RECEIVED:
      _annotations[payload.annotation.id] = payload.annotation;
      _tempAnnotation = null;
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
      // debugger;
      _tempAnnotation = payload.annotation;
      _annotations["temp"] = _tempAnnotation;
      this.__emitChange();
      break;
  }
};

AnnotationStore.find_by_song_id = function (id) {
  return _annotations[id];
};

AnnotationStore.all = function () {
  return Object.keys(_annotations).map(id => {
    return _annotations[id];
  });
};

AnnotationStore.temp = function () {
  return _tempAnnotation;
};

function _resetAnnotations(annotations){
  _annotations = {};
  for (let annotation of annotations){
    _annotations[annotation.id] = annotation;
  }
}

module.exports = AnnotationStore;
