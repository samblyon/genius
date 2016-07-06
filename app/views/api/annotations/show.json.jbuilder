json.extract! @annotation,
  :id,
  :author_id,
  :start_index,
  :end_index,
  :body,
  :song_id,
  :updated_at

json.author @annotation.author.username

json.comments @annotation.comments do |comment|
  json.partial! "/api/comments/comment", comment: comment
end