const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationConstants = require('../constants/annotation_constants');

// NOTE ANNOTATIONS ARE STORED BY ID
let _annotations = {};

const AnnotationStore = new Store(AppDispatcher);

AnnotationStore.__onDispatch = function (payload) {
  switch (payload.actionType) {
    case AnnotationConstants.ANNOTATION_RECEIVED:
      _annotations[payload.annotation.id] = payload.annotation;
      this.__emitChange();
      break;
    case AnnotationConstants.ANNOTATIONS_RECEIVED:
      _resetAnnotations(payload.annotations);
      this.__emitChange();
      break;
    case AnnotationConstants.ANNOTATION_REMOVED:
      delete _annotations[payload.annotation.id];
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

function _resetAnnotations(annotations){
  for (let annotation of annotations){
    _annotations[annotation.id] = annotation;
  }
}

module.exports = AnnotationStore;
