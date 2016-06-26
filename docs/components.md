## Component Hierarchy

**Bolded** components are associated with routes.

(:exclamation: Remember, the bolded components are created by their
associated routes, so the nesting of your bolded components must
_**exactly**_ match the nesting of your routes.)

* **App**
  * Header
    * HeaderSearch
    * HeaderAuth
  * Navbar
  * **SignUp**
  * **SignIn**
  * **Home**
    * About
    * SongDisplay
      * SongDisplayItem
  * **SongsIndexScroll**
    * SongsIndexItem
  * **Song**
    * SongSplash
    * LyricsDisplay
      * Lyrics
      * CommentIndexScroll
        * CommentForm
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
        * CommentIndexItem
  * Footer

## Routes

* **component:** `App` **path:** `/`
  * **component:** `Home` **path:** index
  * **component:** `SongsIndexScroll` **path:** `songs`
  * **component:** `Song` **path:** `songs/:songId`
    * **component:** `SongInfo` **path:** index
    * **component:** `Annotation` **path:** `:annotationId`
