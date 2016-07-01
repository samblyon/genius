module.exports =  {
  fetchAnnotations (songId, onSuccess, onError) {
    $.get({
      url: "api/annotations",
      data: {
        song_id: songId
      },
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  fetchSingleAnnotation (id, onSuccess, onError) {
    $.get({
      url: "api/annotations/" + id,
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  createAnnotation(annotation, onSuccess, onError) {
    $.post({
      url: "api/annotations",
      data: {
        annotation: annotation
      },
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  updateAnnotation(annotation, onSuccess, onError) {
    $.ajax({
      url: "api/annotations/" + annotation.id,
      method: 'PATCH',
      data: {
        annotation: annotation
      },
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  destroyAnnotation(id, onSuccess, onError) {
    $.post({
      url: "api/annotations/" + id,
      method: 'DELETE',
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  }
};
