# Schema Information

## songs
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
artist      | string    | not null
title       | string    | not null
lyrics      | text      | not null
primary_genre | integer | not null, foreign key (references genres), indexed
youtube_url    | string   |
soundcloud_url | string   |
featuring      | string   |
produced_by    | string   |
written_by     | string   |
release_date   | date     |

## genres
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
genre       | string    | not null


## annotations
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
body        | text      | not null
start_index | string    | not null, indexed
end_index   | string    | not null, indexed


## comments
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
author_id   | integer   | not null, foreign key (references users), indexed
commentable_id    | integer  | not null, indexed
commentable_type  | string   | not null, indexed


## upvotes
column name | data type | details
------------|-----------|-----------------------
id          | integer   | not null, primary key
user_id     | integer   | not null, foreign key (references users), indexed
upvotable_id| integer   | not null, indexed
upvotable_type| string   | not null, indexed


## users
column name     | data type | details
----------------|-----------|-----------------------
id              | integer   | not null, primary key
username        | string    | not null, indexed, unique
password_digest | string    | not null
session_token   | string    | not null, indexed, unique
