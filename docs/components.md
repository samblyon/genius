## Component Hierarchy

**Bolded** components are associated with routes.

* **App**
  * Header
    * HeaderSearch
    * HeaderAuth
    * HeaderUserProfile
  * Navbar
  * **SignUp**
  * **SignIn**
  * **Home**
    * About
    * SongDisplay
      * SongDisplayItem
  * **SongsIndexScroll**
    * SongsIndexItem
  * **SongForm**
  * **Song**
    * SongSplash
    * LyricsDisplay
      * Lyrics
      * CommentIndexScroll
        * CommentForm
        * CommentEditForm
        * CommentIndexItem
    * **SongInfo**
      * SongInfoStats
      * SongAbout
        * SongAboutCommentsIndex
        * SongInfoCredits
        * AlbumSongIndex
    * **Annotation**
      * AnnotationAttribution
      * AnnotationContent
      * AnnotationUpvoteForm
      * CommentIndexScroll
        * CommentForm
        * CommentEditForm
        * CommentIndexItem
  * Footer

## Routes

* **component:** `App` **path:** `/`
  * **component:** `Home` **path:** index
  * **component:** `SongsIndexScroll` **path:** `songs`
  * **component:** `SongForm` **path:** `songs/new`
  * **component:** `Song` **path:** `songs/:songId`
    * **component:** `SongInfo` **path:** index
    * **component:** `Annotation` **path:** `:annotationId`
