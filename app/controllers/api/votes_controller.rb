class Api::VotesController < ApplicationController
  def register
    full_vote_conditions = {
      upvotable_id: vote_params[:upvotable_id],
      upvotable_type: vote_params[:upvotable_type],
      vote: vote_params[:vote],
      user_id: current_api_user.id
    }

    partial_vote_conditions = {
      upvotable_id: vote_params[:upvotable_id],
      upvotable_type: vote_params[:upvotable_type],
      user_id: current_api_user.id
    }

    # Destroy vote if already voted this way (ie user is unvoting)
    existing_same_vote = Vote.where(full_vote_conditions).destroy_all

    # if new vote value, destroy any existing user vote on post and create vote
    if existing_same_vote.empty?
      Vote.where(partial_vote_conditions).destroy_all
      @vote = Vote.create!(full_vote_conditions)
    else
      # return vote data minus vote value if unvote has occurred
      @vote = existing_same_vote.first.attributes.except("vote")
    end

    render json: @vote
  end

  private
  def vote_params
    params.require(:vote).permit(
      :upvotable_id,
      :upvotable_type,
      :vote
    )
  end
end
