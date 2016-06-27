# Phase 6: Comments

## Rails
### Models
* Comment
* Commentable Module

### Controllers

### Views
* songs/show.json.jbuilder (upgrade to include 1 comment per annotation)
* annotations/show.json.jbuilder (upgrade to include comments)
* comments/show.json.jbuilder

## Flux
### Views (React Components)
* CommentIndex
  * CommentForm
  * CommentEditForm
  * CommentIndexItem

### Stores

### Actions
* ApiActions.receiveComment -> Triggered by ApiUtil
* ApiActions.removeComment -> Triggered by ApiUtil
* CommentActions.createComment
* CommentActions.updateComment
* CommentActions.destroyComment

### ApiUtil
* ApiUtil.createComment
* ApiUtil.editComment
* ApiUtil.destroyComment

## Gems/Libraries
