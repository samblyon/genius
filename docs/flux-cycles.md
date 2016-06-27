# Flux Cycles

Flux loops are organized by data type. Under each data type, there may
be sub-categories, and each action is listed with the sequence of events
that result from its invocation, ending with the API or store. Finally,
store listeners are listed at the end.

## Song Cycles

### Songs API Request Actions

* `fetchTopSongs`
  0. invoked from `SongsDisplay` `didMount`
  0. `GET /api/songs` is called with query params.
  0. `receiveSongs` is set as the callback.


* `fetchNextTopSongs`
  0. invoked from `SongsDisplay` `onScroll`
  0. `GET /api/songs` is called with query params.
  0. `receiveNextSongs` is set as the callback.


* `fetchAlphabeticalSongs`
  0. invoked from `SongsIndexScroll` `didMount`
  0. `GET /api/songs` is called.
  0. `receiveSongs` is set as the callback.


* `fetchNextAlphabeticalSongs`
  0. invoked from `SongsIndexScroll` `onScroll`
  0. `GET /api/songs` is called.
  0. `receiveNextSongs` is set as the callback.


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
  0. `Song` store replaces `_songs[id]` and emits change.


* `receiveNextSongs(songs)`
  0. invoked from an API callback.
  0. `Song` store appends received songs to `_songs` and emits change.

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
