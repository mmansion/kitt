/*
 * Cyto User Authentication
 */

var express       = require('express')
  , auth          = new express.Router()
  , nano          = require('nano')('http://localhost:5984/') 
  , cytodb        = nano.use('cytodb')
  , passport      = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


passport.use(new LocalStrategy(

  function(username, password, done) {

    console.log(username);
    console.log(password);

    // var data = req.body;

    // cytodb.get('users', function(err, doc) {
    //   if(!err) {
    //     if(doc.hasOwnProperty(data.username)) {
    //       if(doc[data.username].password === data.password) {
    //         res.json({ status: '200', message: 'username and password accepted' });
    //       } else {
    //         res.json({ status: '401', message: 'invalid password' });
    //       }
    //     } else {
    //       res.json({ status: '404', message: 'username not found' });
    //     }
    //   } else {
    //     res.json({ status: '505', message: 'database error' });
    //   }
    // });

    // User.findOne({ username: username }, function(err, user) {
    //   if (err) { return done(err); }
    //   if (!user) {
    //     return done(null, false, { message: 'Incorrect username.' });
    //   }
    //   if (!user.validPassword(password)) {
    //     return done(null, false, { message: 'Incorrect password.' });
    //   }
    //   return done(null, user);
    // });
  }
));

/* Top-level middleware for every users request
   -------------------------------------------------- */

auth.use(function(req, res, next) {

  //TODO: post validation
  //https://github.com/freewil/express-form

  console.log("auth request received");

  // log each request to the console
  console.log(req.method, req.url);

  // continue doing what we were doing and go to the route
  next(); 
});

/* Core Views / Pages
   -------------------------------------------------- */

auth.post('/', passport.authenticate('local', { 
  successRedirect: '/',
  failureRedirect: '/login',
  failureFlash: true })
);



function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(loginPassword, storedPassword) {
  return bcrypt.compareSync(loginPassword, storedPassword);
};


// auth.route('/')

// .post(function(req, res) {

  
// });

// function errorHandler(err) {
//   if(err) {
//     console.log('error:', err.status_code, err.request.uri);
//   }
// }


module.exports = auth;