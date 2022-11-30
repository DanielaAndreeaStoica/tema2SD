function performRequest(request, callback) {
  const currentUser = localStorage.getItem('userContext');
  if (currentUser) {
    const user = JSON.parse(currentUser);
    const auth = 'Basic ' + btoa(user.username + ":" + user.password);
    if(request.headers){
      request.headers.append('Authorization',auth);
    }else{
      request.headers = new Headers('Authorization',auth);
    }
  }
  fetch(request)
    .then(
      function (response) {
        if (response.ok) {
          response.json().then(json => callback(json, response.status, null));
        }
        else {
          response.json().then(err => callback(null, response.status, err)); 
        }
      })
    .catch(function (err) {
      //catch any other unexpected error, and set custom code for error = 1
      callback(null, 1, err)
    });
}

export default { performRequest };
