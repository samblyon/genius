class Api::VotesController < ApplicationController
  def register
    vote = Vote.find_or_create_by(
      upvotable_id: vote_params[:upvotable_id],
      upvotable_type: vote_params[:upvotable_type]
    )

    # test if vote the same
    # if same delete vote
    # if different update vote

    # return vote if valid
    if vote.save
      render json: vote
    else
      render json: vote.errors, status: 422
    end
  end

  def destroy
    @vote = Vote.find(params: id)
    @vote.destroy
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
