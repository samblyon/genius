# Phase 5: Annotations (2 days)

## Rails
### Models
* Annotation

### Controllers
* Api::Annotations (create, destroy, show, update)

### Views
* songs/show.json.jbuilder (upgrade to provide annotations)
* annotations/show.json.jbuilder

## Flux
### Views (React Components)
* AnnotationSuggestion
* Annotation
  * AnnotationAttribution
  * AnnotationContent

### Stores
* Annotation
* Upgrade `SongStore.__onDispatch`

### Actions
* ApiActions.fetchSingleAnnotation -> triggered by ApiUtil
* ApiActions.receiveSingleAnnotation
* ApiActions.removeAnnotation
* AnnotationActions.createAnnotation
* AnnotationActions.editAnnotation
* AnnotationActions.destroyAnnotation

### ApiUtil
* ApiUtil.fetchSingleAnnotation
* ApiUtil.fetchSingleSong (upgrade)
* ApiUtil.createAnnotation
* ApiUtil.editAnnotation
* ApiUtil.destroyAnnotation

## Gems/Libraries
