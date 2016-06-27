# Phase 8: Upvotes

## Rails
### Models
* Upvote

### Controllers
* Api::UpvotesController

### Views
* annotations/show.json.jbuilder  (upgrade to include upvotes)
* comments/show.json.jbuilder (upgrade to include upvotes)
* annotations/show.json.jbuilder (upgrade to include upvotes)

## Flux
### Views (React Components)
* CommentUpvoteForm

### Stores
* Upgrade `Song` `Annotation` stores `.__onDispatch` methods to add votecount when received

### Actions
* ApiActions.receiveVote
* VoteActions.toggleSongUpvote
* VoteActions.toggleAnnotationUpvote
* VoteActions.toggleCommentUpvote
* ApiUtil.toggleSongUpvote
* ApiUtil.toggleAnnotationUpvote
* ApiUtil.toggleCommentUpvote


## Gems/Libraries
