module Upvotable
    extend ActiveSupport::Concern
    included do
      has_many :votes, as: :upvotable, dependent: :destroy
    end

    # instance methods go here
    def receiveVote(vote)
      vote = self
        .votes
        .find_or_create_by(user_id: current_api_user.id)

      vote.update(vote: vote)

      if vote.save
        render :show
      else
        render json: {"error": "vote could not be logged"}, status: 422
      end
    end

    module ClassMethods
      # static methods go here
      # def static_method
      #
      # end
    end
end
