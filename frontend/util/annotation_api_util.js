module.exports =  {
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
  }
};
