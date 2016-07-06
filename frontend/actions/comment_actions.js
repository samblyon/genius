const AppDispatcher = require('../dispatcher/dispatcher');
const CommentApiUtil = require('../util/comment_api_util');
const ErrorActions = require('./error_actions');

module.exports = {
  createComment(comment, formName){
    CommentApiUtil.createComment(
      comment,
      this.receiveSingleComment,
      ErrorActions.setErrors.bind(null, formName)
    );
  },

  destroyComment(id){
    CommentApiUtil.destroyComment(id, this.removeComment, ErrorActions.onError);
  },

  updateComment(comment, formName){
    CommentApiUtil.updateComment(
      comment,
      this.receiveSingleComment,
      ErrorActions.setErrors.bind(null, formName));
  },

  receiveSingleComment(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_RECEIVED,
      comment: comment
    });
  },

  removeComment(comment){
    AppDispatcher.dispatch({
      actionType: CommentConstants.COMMENT_REMOVED,
      comment: comment
    });
  }
};
