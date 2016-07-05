const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationApiUtil = require('../util/annotation_api_util');
const ErrorActions = require('../actions/error_actions');
const AnnotationConstants = require('../constants/annotation_constants');

module.exports = {
  fetchAnnotations (songId) {
    AnnotationApiUtil.fetchAnnotations(
      songId, this.receiveAnnotations, ErrorActions.onError
    );
  },

  fetchSingleAnnotation (id) {
    AnnotationApiUtil.fetchSingleAnnotation(
      id, this.receiveAnnotation, ErrorActions.onError
    );
  },

  createTempAnnotation(annotation) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.STORE_TEMP_ANNOTATION,
      annotation: annotation
    });
  },

  createAnnotation(annotation, formName) {
    AnnotationApiUtil.createAnnotation(
      annotation,
      this.receiveAnnotation,
      ErrorActions.setFormErrors.bind(null, formName)
    );
  },

  updateAnnotation(annotation, formName) {
    AnnotationApiUtil.updateAnnotation(
      annotation,
      this.receiveAnnotation,
      ErrorActions.setFormErrors.bind(null, formName)
    );
  },

  destroyAnnotation(id, formName) {
    AnnotationApiUtil.destroyAnnotation(
      id,
      this.removeAnnotation,
      ErrorActions.onError
    );
  },

  clearTemp() {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.CLEAR_TEMP_ANNOTATION
    });
  },

  receiveAnnotations(annotations) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.ANNOTATIONS_RECEIVED,
      annotations: annotations
    });
  },

  receiveAnnotation(annotation) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.ANNOTATION_RECEIVED,
      annotation: annotation
    });
  },

  removeAnnotation(annotation) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.ANNOTATION_REMOVED,
      annotation: annotation
    });
  }
};
