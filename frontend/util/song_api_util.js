module.exports =  {
  fetchAlphabeticalSongs (onSuccess, onError) {
    $.get({
      url: "api/songs",
      data: {
        query: "alphabetical"
      },
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  fetchTopSongs (onSuccess, onError) {
    $.get({
      url: "api/songs",
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  fetchSingleSong (id, onSuccess, onError) {
    $.get({
      url: "api/songs/" + id,
      success(res){
        onSuccess(res);
      },
      error(res){
        onError(res);
      }
    });
  },

  createSong(song, onSuccess, onError) {
    $.post({
      url: "api/songs",
      data: {
        song: song
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
