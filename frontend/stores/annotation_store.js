const Store = require('flux/utils').Store;
const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationConstants = require('../constants/annotation_constants');
const CommentConstants = require('../constants/comment_constants');


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
    case AnnotationConstants.UPDATED_ANNOTATION_RECEIVED:
      _annotations[payload.annotation.id].body = payload.annotation.body;
      _clearTempAnnotation();
      // _lastAddedAnnotation = payload.annotation;
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
    case CommentConstants.ANNOTATION_COMMENT_RECEIVED:
      _addComment(payload.comment);
      this.__emitChange();
      break;
    case CommentConstants.ANNOTATION_COMMENT_REMOVED:
      _removeComment(payload.comment);
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

function _addComment(comment){
  const annotationId = comment.commentable_id;
  _annotations[annotationId].comments.push(comment);
}

function _removeComment(comment){
  const annotationId = comment.commentable_id;
  const annotation = _annotations[annotationId];
  const commentIds = annotation.comments.map(comment => comment.id);
  const commentIndex = commentIds.indexOf(comment.id);
  annotation.comments.splice(commentIndex, 1);
}

module.exports = AnnotationStore;
