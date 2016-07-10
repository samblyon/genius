const React = require('react');
const SessionStore = require('../../stores/session_store');
const VoteActions = require('../../actions/vote_actions');

const VoteForm = React.createClass({
  getInitialState: function() {
    const votes = this.props.votes;

    return {
      currentUser: SessionStore.currentUser(),
      userVote: this.userVoteIfPresentOrZero()
    };
  },

  componentDidMount(){
    this.sessionListener = SessionStore.addListener(this._onSessionChange);
  },

  componentWillUnmount(){
    this.sessionListener.remove();
  },

  _onSessionChange(){
    this.replaceState(this.getInitialState());
  },

  userVoteIfPresentOrZero(){
    debugger;
    const votes = this.props.votes;
    const currentUser = SessionStore.currentUser();
    if (currentUser && votes) {
      return votes[currentUser.id];
    } else {
      return 0;
    }
  },

  vote(voteValue, e){
    debugger;
    e.preventDefault();
    const vote = {
      vote: voteValue,
      upvotable_type: this.props.upvotableType,
      upvotable_id: this.props.upvotableId
    };
    VoteActions.registerVote(vote);
  },

  render(){
    const votes = this.props.votes;
    const score = 0;
    let sign;

    let upvoteClass = "vote-button upvoted upvote";
    let downvoteClass = "vote-button downvoted downvote";

    if (this.userVoteIfPresentOrZero() !== 1){
      upvoteClass = "vote-button upvote"
    }

    if (this.userVoteIfPresentOrZero() !== -1){
      downvoteClass = "vote-button downvote"
    }

    if (votes) {
      Object.keys(votes).forEach(key => {
        const voteValue = votes[key].vote;
        score + (voteValue) ? voteValue : 0;
      });

      sign = (score >= 0) ? " + " : " - ";
    }

    const tallyClass = (score < 0) ? "tally negative" : "tally positive";

    return(
      <div className="vote-form clearfix">
        <button
          onClick={this.vote.bind(null, 1)}
          className={upvoteClass}></button>
        <div className={tallyClass}>{sign} {(votes) ? score : 0}</div>
        <button
          onClick={this.vote.bind(null, -1)}
          className={downvoteClass}></button>
      </div>
    );
  },
});

module.exports = VoteForm;
