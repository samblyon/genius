module.exports =  {
  fetchAnnotations (songId, onSuccess, onError) {
    $.get({
      url: "api/annotations",
      dataType: "JSON",
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
      dataType: "JSON",
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
      dataType: "JSON",
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
    $.post({
      url: "api/annotations/" + annotation.id,
      dataType: "JSON",
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
      dataType: "JSON",
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
