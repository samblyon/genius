module.exports = {
  registerVote(vote, onSuccess, onError){
    $.post({
      url: "api/votes",
      data: {
        vote: vote
      },
      success: onSuccess,
      error: onError
    });
  }
};

// vote = {vote, votable_type, votable_id}
