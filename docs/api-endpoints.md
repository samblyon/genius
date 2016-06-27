# API Endpoints

## HTML API

### Root

- `GET /` - loads React web app

### Users

- `POST /users`

### Session

- `POST /session`
- `DELETE /session`

## JSON API

### Songs

- `GET /api/songs`
  - Songs home/index/search
  - accepts `top` query param to list top songs by upvotes
  - accepts `genre` query param to list songs for requested genre
  - accepts pagination params (if I get there)
- `POST /api/songs`
- `GET /api/songs/:id`

### Annotations

-  A song's annotations will be included in the song show template
- `POST /api/annotations`
  - includes query param for song
  - returns annotations ordered by upvotes descending
- `GET /api/annotations/:id`
  - returns annotation with all associated comments
  - comments will be ordered by upvoted descending
- `PATCH /api/annotations/:id`
- `DELETE /api/annotations/:id`
  - destroys associated comments


### Comments

- A song's comments will be included in the song show template
- An annotation's comments will be included in the annotation show template
- `POST /api/comments`
  - includes param indicating commentable type and id
- `DELETE /api/comments/:id`

### Upvotes

- Upvotes for songs, annotations and comments will be included in their respective show pages
- Upvotes will be treated as singular resources nested within each of the commentable types (song, annotation, comment)
- `PATCH /api/songs/:id/upvote`
- `PATCH /api/annotations/:id/upvote`
- `PATCH /api/comments/:id/upvote`
