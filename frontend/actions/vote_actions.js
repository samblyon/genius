const AppDispatcher = require('../dispatcher/dispatcher');
const VoteConstants = require('../constants/vote_constants');
const VoteApiUtil = require('../util/vote_api_util');

module.exports = {
  registerVote(vote){
    VoteApiUtil.registerVote(
      vote,
      this.receiveVote,
      ErrorActions.onError
    );
  },

  receiveVote(vote){
    AppDispatcher.dispatch({
      actionType: VoteConstants.VOTE_RECEIVED,
      vote: vote
    });
  }
}
