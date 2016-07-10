const AppDispatcher = require('../dispatcher/dispatcher');
const VoteConstants = require('../constants/vote_constants');
const VoteApiUtil = require('../util/vote_api_util');
const ErrorActions = require('../actions/error_actions');
const CommentActions = require('../actions/comment_actions');


module.exports = {
  registerVote(vote){
    if (vote.upvotable_type === "Comment") {
      VoteApiUtil.registerVote(
        vote,
        CommentActions.receiveSingleComment,
        ErrorActions.onError
      );
    } else {
      VoteApiUtil.registerVote(
        vote,
        this.receiveVote,
        ErrorActions.onError
      );
    }
  },

  receiveVote(vote){
    let actionType = VoteConstants.VOTE_RECEIVED;
    if (!vote.vote) {
      actionType = VoteConstants.VOTE_REMOVED;
    }

    AppDispatcher.dispatch({
      actionType: actionType,
      vote: vote
    });
  }
}
