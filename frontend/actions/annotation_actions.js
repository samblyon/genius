const AppDispatcher = require('../dispatcher/dispatcher');
const AnnotationApiUtil = require('../util/annotation_api_util');
const ErrorActions = require('../actions/error_actions');
const AnnotationConstants = require('../constants/annotation_constants');

module.exports = {
  fetchSingleAnnotation (id) {
    AnnotationApiUtil.fetchSingleAnnotation(
      id, this.receiveAnnotation, ErrorActions.onError
    );
  },

  createAnnotation(annotation, formName) {
    AnnotationApiUtil.createAnnotation(
      annotation,
      this.receiveAnnotation,
      ErrorActions.setAnnotationErrors.bind(null, formName)
    );
  },

  receiveAnnotation(annotation) {
    AppDispatcher.dispatch({
      actionType: AnnotationConstants.ANNOTATION_RECEIVED,
      annotation: annotation
    });
  }
};
