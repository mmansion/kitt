(function(){

 
    var loginBtn = document.getElementById('cy-login-btn');

    loginBtn.addEventListener('click', function() {
       var http = new XMLHttpRequest
         , url = "auth";

      var loginForm = document.getElementById('cy-login-form')
        , data = {};

      for (var i = 0; i < loginForm.length; i++) {
        if(loginForm.elements[i].value.length) {
          data[loginForm.elements[i].name] = loginForm.elements[i].value.trim();
        }
      }
      if(Object.size(data) > 0) {

        http.open("POST", url, true);

        //Send the proper header information along with the request
        http.setRequestHeader('Content-type', 'application/json');
        http.setRequestHeader('Cache-Control', 'no-cache');
        http.onreadystatechange = function() {
          if(http.readyState == 4 && http.status == 200) {
            alert(http.responseText);
          }
        };

        http.send(JSON.stringify(data));
      }
    });

    Object.size = function(obj) {
      var size = 0, key;
      for (key in obj) {
          if (obj.hasOwnProperty(key)) size++;
      }
      return size;
    };

    function handleAjaxResponse() {
      alert(this.responseText);
    };


})();