module.exports = {
  createComment(comment, onSuccess, onError){
    $.post({
      url: "api/comments.json",
      data: {
        comment: comment
      },
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  updateComment(comment, onSuccess, onError){
    $.post({
      url: "api/comments/" + comment.id,
      dataType: "JSON",
      method: "PATCH",
      data: {
        comment: comment
      },
      success(res){
        onSuccess(res);
      },
      errors(res){
        onError(res);
      }
    });
  },

  destroyComment(id, onSuccess, onError){
    $.post({
      url: "api/comments/" + id,
      dataType: "JSON",
      method: "DELETE",
      success(res){
        onSuccess(res);
      },
      errors(res){
        onError(res);
      }
    });
  }
}
