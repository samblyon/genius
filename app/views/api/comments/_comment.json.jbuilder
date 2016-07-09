json.extract! comment,
  :id,
  :body,
  :author_id,
  :created_at,
  :commentable_type,
  :commentable_id

json.set! :votes do
  comment.votes.each do |vote|
    json.set! vote.user_id, vote
  end
end

json.author comment.author.username
