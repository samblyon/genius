# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

## Auth Cycles

### Users API Request Actions

* `signUp`
  0. invoked from `SignupForm` `onSubmit`
  0. `POST api/users` is called.
  0. `receiveCurrentUser` is set as the success callback.
  0. `ErrorActions.setErrors` is set as the error callback.

### Sessions API Request Actions

* `login`
  0. invoked from `LoginForm` `onSubmit`
  0. `POST api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.
  0. `ErrorActions.setErrors` is set as the error callback.


* `logout`
  0. invoked from `Header` logout button `onClick`
  0. `POST api/session` is called.
  0. `receiveCurrentUser` is set as the success callback.
  0. `onError` is set as the error callback.


### Sessions API Response Actions
* `receiveCurrentUser`
  0. invoked from API callbacks and ReactDOM initial render
  0. `Session` store replaces `_currentUser` and emits change.


* `onError`
  0. invoked from an API callback passed to `logout` only
  0. Error logged to the console.


### Session Store Listeners
* `LoginForm` listens to `Session` store.
* `SignupForm` listens to `Session` store.


## Error Cycles

### Errors API Response Actions

* `setErrors`
  0. invoked from an API callback
  0. `Errors` store updates `_errors` and `_form` and emits change.


* `clearErrors`
  0. invoked from an API callback
  0. `Errors` store resets `_errors` and `_form` and emits change.

### Error Store Listeners
* `LoginForm` listens to the `Error` store.
* `SignupForm` listens to the `Error` store.
* `SongForm` listens to the `Error` store.

## Song Cycles

### Songs API Request Actions

* `fetchTopSongs`
  0. invoked from `SongsDisplay` `didMount`
  0. `GET /api/songs` is called with query params.
  0. `receiveSongs` is set as the callback.


* `fetchAlphabeticalSongs`
  0. invoked from `SongsIndexScroll` `didMount`
  0. `GET /api/songs` is called.
  0. `receiveSongs` is set as the callback.


* `fetchSingleSong(id)`
  0. invoked from `Song` `didMount`
  0. `GET /api/songs/:songId` is called.
  0. `receiveSingleSong` is set as the callback.


* `createSong(song)`
  0. invoked from `SongForm` `onSubmit`
  0. `POST /api/songs` is called.
  0. `receiveSingleSong` is set as the callback.

### Songs API Response Actions

* `receiveSongs(songs)`
  0. invoked from an API callback.
  0. `Song` store replaces `_songs` and emits change.


* `receiveSingleSong(song)`
  0. invoked from an API callback.
  0. `Song` store updates `_songs[id]` and emits change.


### Song Store Listeners
* `SongsDisplay` listens to the `Song` Store
* `SongsIndex` listens to the `Song` Store
* `Song` listens to the `Song` Store

## Annotation Cycles

### Annotation API Request Actions

* `fetchAnnotation(id)`
  0. invoked from `Song` `didMount`/`willReceiveProps`
  0. `GET /api/annotations` is called.
  0. `receiveAnnotation` is set as the callback.


* `createAnnotation`
  0. invoked from `AnnotationForm` `onSubmit`
  0. `POST /api/annotations` is called.
  0. `receiveAnnotation` is set as the callback.


* `updateAnnotation(id)`
  0. invoked from `AnnotationEditForm` `onSubmit`
  0. `PATCH /api/annotations/:id` is called.
  0. `receiveAnnotation` is set as the callback.


* `toggleAnnotationUpvote`
  0. invoked from `AnnotationUpvoteForm` button `onClick`
  0. `PATCH api/annotations/:id/upvote` is called.
  0. `receiveAnnotation` is set as the callback.


* `destroyAnnotation(id)`
  0. invoked from `AnnotationEditForm` `onSubmit`
  0. `DELETE /api/annotations/:id` is called.
  0. `removeAnnotation` is set as the callback.

### Annotation API Response Actions

* `receiveAnnotation`
  0. invoked from API callback.
  0. `Annotation` store updates `_annotations[id]` and emits change.


* `removeAnnotation`
  0. invoked from API callback.
  0. `Annotation` store removes `_annotations[id]` and emits change.

### Annotation Store Listeners
* `Annotation` listens to the `Annotation` store.

## Comments Cycles

### Comments API Request Actions

* `createComment`
  0. invoked from `CommentForm` `onSubmit`
  0. `POST /api/comments` is called.
  0. `receiveComment` is set as the callback.


* `updateComment`
  0. invoked from `CommentForm` `onSubmit`
  0. `PATCH /api/comments/:id` is called.
  0. `receiveComment` is set as the callback.


* `toggleCommentUpvote`
  0. invoked from `CommentUpvoteForm` vote button `onClick`
  0. `PATCH /api/comments/:id/upVote` is called.
  0. `receiveComment` is set as the callback.


* `editComment`
  0. invoked from `CommentEditForm` `onSubmit`
  0. `PATCH /api/comments/:id` is called.
  0. `receiveComment` is set as the callback.


* `destroyComment`
  0. invoked from `CommentIndexItem` delete button `onClick`
  0. `DELETE /api/comments/:id` is called.
  0. `removeComment` is set as the callback.

### Comments API Response Actions

* `receiveComment`
  0. invoked from an API callback.
  0. CommentActions dispatches payload; actionType corresponds to comment subject type.
  0. `Song` or `Annotation` store updates based on type and emits change.


* `removeComment`
  0. invoked from an API callback.
  0. CommentActions dispatches payload; actionType corresponds to comment subject type.
  0. `Song` or `Annotation` store removes comment and emits change.
