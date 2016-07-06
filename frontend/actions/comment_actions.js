const AppDispatcher = require('../dispatcher/dispatcher');
const CommentApiUtil = require('../util/comment_api_util');
const ErrorActions = require('./error_actions');
const CommentConstants = require('../constants/comment_constants');

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
    let action = CommentConstants.ANNOTATION_COMMENT_RECEIVED;
    if (comment.commentable_type === "Song") {
      action = CommentConstants.SONG_COMMENT_RECEIVED;
    }

    AppDispatcher.dispatch({
      actionType: action,
      comment: comment
    });
  },

  removeComment(comment){
    let action = CommentConstants.ANNOTATION_COMMENT_REMOVED;
    if (comment.commentable_type === "Song") {
      action = CommentConstants.SONG_COMMENT_REMOVED;
    }
    AppDispatcher.dispatch({
      actionType: action,
      comment: comment
    });
  }
};
