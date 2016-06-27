## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Header
    * HeaderAuth
    * HeaderUserProfile
  * Navbar
  * **SignUp**
  * **SignIn**
  * **Home**
    * About
    * SongDisplay
      * SongDisplayItem
  * **SongsIndex**
    * SongsIndexItem
  * **SongForm**
  * **Song**
    * SongSplash
    * LyricsDisplay
      * Lyrics
      * CommentIndex
        * CommentForm
        * CommentEditForm
        * CommentIndexItem
          * CommentUpvoteForm
    * **SongInfo**
      * SongInfoStats
      * SongAbout
    * AnnotationSuggestion
    * **Annotation**
      * AnnotationAttribution
      * AnnotationContent
      * AnnotationUpvoteForm
      * CommentIndex
        * CommentForm
        * CommentEditForm
        * CommentIndexItem
          * CommentUpvoteForm
  * Footer

## Routes

* **component:** `App` **path:** `/`
  * **component:** `Home` **path:** index
  * **component:** `SongsIndexScroll` **path:** `songs`
  * **component:** `SongForm` **path:** `songs/new`
  * **component:** `Song` **path:** `songs/:songId`
    * **component:** `SongInfo` **path:** index
    * **component:** `Annotation` **path:** `:annotationId`
