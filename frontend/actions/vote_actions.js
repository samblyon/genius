const AppDispatcher = require('../dispatcher/dispatcher');
const VoteConstants = require('../constants/vote_constants');
const VoteApiUtil = require('../util/vote_api_util');
const ErrorActions = require('../actions/error_actions');

module.exports = {
  registerVote(vote){
    VoteApiUtil.registerVote(
      vote,
      this.receiveVote,
      ErrorActions.onError
    );
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
