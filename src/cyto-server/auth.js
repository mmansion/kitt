var nano     = require('nano')('http://localhost:5984')
  , username = 'user'
  , userpass = 'pass'
  , callback = console.log // this would normally be some callback
  , cookies  = {} // store cookies, normally redis or something
  ;

nano.auth(username, userpass, function (err, body, headers) {
  if (err) {
    return callback(err);
  }

  if (headers && headers['set-cookie']) {
    cookies[user] = headers['set-cookie'];
  }

  callback(null, "it worked");
});