json.extract! comment,
  :id,
  :body,
  :author_id,
  :created_at,
  :commentable_type,
  :commentable_id

json.author comment.author.username
