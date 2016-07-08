module.exports = {
  signUp(user, onSuccess, onError){
    $.post({
      url: "/api/users.json",
      data: {
        api_user: user
      },
      success(res){
        onSuccess(res);
      },
      error(err){
        onError(err);
      }
    });
  },

  login(user, onSuccess, onError){
    $.post({
      url: "/api/users/sign_in.json",
      data: {
        api_user: {
          username: user.username,
          password: user.password,
        }
      },
      success(res){
        onSuccess(res);
      },
      error(err){
        onError(err);
      }
    });
  },

  logout(onSuccess, onError){
    $.post({
      url: "/api/users/sign_out.json",
      method: "DELETE",
      success(res){
        onSuccess(res);
      },
      error(err){
        onError(err);
      }
    });
  }
};
