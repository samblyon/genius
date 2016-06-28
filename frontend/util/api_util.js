$.ajax({
  url: "/api/users.json",
  type: "POST",
  data: {
    api_user: {
      email: "sam@sam.com",
      password: "fruits",
      password_confirmation: "fruits"
    }
  },
  success(res){
    console.log(res);
  },
  errors(err){
    console.log(err);
  }
});

$.ajax({
  url: "/api/users/sign_in.json",
  type: "POST",
  data: {
    api_user: {
      email: "sam@sam.com",
      password: "fruits"
    }
  },
  success(res){
    console.log(res);
  },
  errors(err){
    console.log(err);
  }
});

$.ajax({
  url: "/api/users/sign_out.json",
  method: "DELETE",
  success(res){
    console.log(res);
  },
  errors(err){
    console.log(err);
  }
});
