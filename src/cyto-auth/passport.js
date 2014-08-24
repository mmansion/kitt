// load all the things we need
var LocalStrategy    = require('passport-local').Strategy
  , FacebookStrategy = require('passport-facebook').Strategy
  , TwitterStrategy  = require('passport-twitter').Strategy
  , GoogleStrategy   = require('passport-google-oauth').OAuth2Strategy;
 

var User   = require('../app/models/user');
var bcrypt = require('bcrypt-nodejs');
 
// load the auth variables
var configAuth = require('./auth'); // use this one for testing

var nano  = require('nano')('http://localhost:5984/');
var db    = nano.use('node_auth');

var _user = { //schema
  local:    {},
  facebook: {},
  google:   {},
  twitter:  {}
};

//------------------------------------------------------------

//DB TEST AREA

// db.view('users', 'by_email', { keys: ['xii799@gmail.com'] }, function(err, body) {
//   if(err) return done(err); //if errors, return the error

//   if(body.rows.length) {
//     console.log(body.rows[0].value);
//   }
// });

// db.view('users', 'by_email', function(err, body) {
//   if(err) return done(err); //if errors, return the error

//   body.rows.forEach(function(row) {
//     console.log(row);
//   });
// });

// var data = {
//   local : {
//     email: 'test@test.com',
//     password: generateHash('test') 
//   }
// };


// db.insert(data, function(err, body) {
//   if(err) return done(err); //if errors, return the error

//   console.log(body);
// });

// db.view('users', 'by_id', { keys: ['14f2e5c18abc6ffa1e058a509a001924'] } ,function(err, body) {
//   if(err) return done(err); //if errors, return the error
//   console.log(body);
// });

// db.view('users', 'by_password', { keys: [password] }, function(err, body) {
//   if(err) return done(err); //if errors, return the error
//   if(body.rows.length) { //existing user
//     console.log(body.rows);
//   }
//     //return bcrypt.compareSync(password, this.local.password);
// });


//------------------------------------------------------------


function generateHash(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

function validPassword(loginPassword, storedPassword) {
  return bcrypt.compareSync(loginPassword, storedPassword);
};

module.exports = function(passport) {
 
  // =========================================================================
  // passport session setup ==================================================
  // =========================================================================
  // required for persistent login sessions
  // passport needs ability to serialize and unserialize users out of session
 
  // used to serialize the user for the session
  passport.serializeUser(function(user, done) {
    console.log("serializing user", user);
      done(null, user._id);
  });
 
  // used to deserialize the user
  passport.deserializeUser(function(id, done) {
    console.log("deserialize user!!!!", id);

    db.view('users', 'by_id', { keys: [id] } ,function(err, body) {
      var user = body.rows[0].value;
      done(err, user);
    });
  });
 
    // =========================================================================
    // LOCAL LOGIN =============================================================
    // =========================================================================
    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },

    function(req, email, password, done) {
        
        // asynchronous
        process.nextTick(function() {

          db.view('users', 'by_email', {keys: [email] }, function(err, body) {
            if(err) return done(err); //if errors, return the error

            if(body.rows.length) {
              var user = body.rows[0].value;
              console.log(user);
              if(!validPassword(password, user.local.password)) {
                return done(null, false, req.flash('loginMessage', 'Oops! Wrong password.'));
              } else {
                return done(null, user);
              }
            } else {
              return done(null, false, req.flash('loginMessage', 'No user found.'));
            }
          });
        });
 
    }));
 
    // =========================================================================
    // LOCAL SIGNUP ============================================================
    // =========================================================================
    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
    },
    function(req, email, password, done) {
 
        // asynchronous
        process.nextTick(function() {

            //  Whether we're signing up or connecting an account, we'll need
            //  to know if the email address is in use.

            db.view('users', 'by_email', { keys: [email] } ,function(err, body) {
              if(err) return done(err); //if errors, return the error

              
              if(body.rows.length) { //existing user

                return done(null, false, req.flash('signupMessage', 'That email is already taken.'));


              } else if(req.user) { //  If we're logged in, we're connecting a new local account.

                  console.log("we are already logged in");
                    // var user            = req.user;
                    // user.local.email    = email;
                    // user.local.password = user.generateHash(password);
                    // user.save(function(err) {
                    //     if (err)
                    //         throw err;
                    //     return done(null, user);
                    // });

                } else { //  We're not logged in, so we're creating a brand new user.
                  _user.local.email = email;
                  _user.local.password = generateHash(password);

                  db.insert(_user, function(err, body) {
                    if(err) return done(err); //if errors, return the error
                    _user.id = body.id; //adds the document id, which passport uses to serialize user into a session
                    return done(null, _user);
                  });


                }

              });

        });
 
    }));
 
    // =========================================================================
    // FACEBOOK ================================================================
    // =========================================================================
    passport.use(new FacebookStrategy({
 
        clientID        : configAuth.facebookAuth.clientID,
        clientSecret    : configAuth.facebookAuth.clientSecret,
        callbackURL     : configAuth.facebookAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
 
    },
    function(req, token, refreshToken, profile, done) {
 
        // asynchronous
        process.nextTick(function() {
 
            // check if the user is already logged in
            if (!req.user) {
 
                User.findOne({ 'facebook.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
 
                    if (user) {
 
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.facebook.token) {
                            user.facebook.token = token;
                            user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                            user.facebook.email = profile.emails[0].value;
 
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
 
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser            = new User();
 
                        newUser.facebook.id    = profile.id;
                        newUser.facebook.token = token;
                        newUser.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                        newUser.facebook.email = profile.emails[0].value;
 
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
 
            } else {
                // user already exists and is logged in, we have to link accounts
                var user            = req.user; // pull the user out of the session
 
                user.facebook.id    = profile.id;
                user.facebook.token = token;
                user.facebook.name  = profile.name.givenName + ' ' + profile.name.familyName;
                user.facebook.email = profile.emails[0].value;
 
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
 
            }
        });
 
    }));
 
    // =========================================================================
    // TWITTER =================================================================
    // =========================================================================
    passport.use(new TwitterStrategy({
 
        consumerKey     : configAuth.twitterAuth.consumerKey,
        consumerSecret  : configAuth.twitterAuth.consumerSecret,
        callbackURL     : configAuth.twitterAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
 
    },
    function(req, token, tokenSecret, profile, done) {
 
        // asynchronous
        process.nextTick(function() {
 
            // check if the user is already logged in
            if (!req.user) {
 
                User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
 
                    if (user) {
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.twitter.token) {
                            user.twitter.token       = token;
                            user.twitter.username    = profile.username;
                            user.twitter.displayName = profile.displayName;
 
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
 
                        return done(null, user); // user found, return that user
                    } else {
                        // if there is no user, create them
                        var newUser                 = new User();
 
                        newUser.twitter.id          = profile.id;
                        newUser.twitter.token       = token;
                        newUser.twitter.username    = profile.username;
                        newUser.twitter.displayName = profile.displayName;
 
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
 
            } else {
                // user already exists and is logged in, we have to link accounts
                var user                 = req.user; // pull the user out of the session
 
                user.twitter.id          = profile.id;
                user.twitter.token       = token;
                user.twitter.username    = profile.username;
                user.twitter.displayName = profile.displayName;
 
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
            }
 
        });
 
    }));
 
    // =========================================================================
    // GOOGLE ==================================================================
    // =========================================================================
    passport.use(new GoogleStrategy({
 
        clientID        : configAuth.googleAuth.clientID,
        clientSecret    : configAuth.googleAuth.clientSecret,
        callbackURL     : configAuth.googleAuth.callbackURL,
        passReqToCallback : true // allows us to pass in the req from our route (lets us check if a user is logged in or not)
 
    },
    function(req, token, refreshToken, profile, done) {
 
        // asynchronous
        process.nextTick(function() {
 
            // check if the user is already logged in
            if (!req.user) {
 
                User.findOne({ 'google.id' : profile.id }, function(err, user) {
                    if (err)
                        return done(err);
 
                    if (user) {
 
                        // if there is a user id already but no token (user was linked at one point and then removed)
                        if (!user.google.token) {
                            user.google.token = token;
                            user.google.name  = profile.displayName;
                            user.google.email = profile.emails[0].value; // pull the first email
 
                            user.save(function(err) {
                                if (err)
                                    throw err;
                                return done(null, user);
                            });
                        }
 
                        return done(null, user);
                    } else {
                        var newUser          = new User();
 
                        newUser.google.id    = profile.id;
                        newUser.google.token = token;
                        newUser.google.name  = profile.displayName;
                        newUser.google.email = profile.emails[0].value; // pull the first email
 
                        newUser.save(function(err) {
                            if (err)
                                throw err;
                            return done(null, newUser);
                        });
                    }
                });
 
            } else {
                // user already exists and is logged in, we have to link accounts
                var user               = req.user; // pull the user out of the session
 
                user.google.id    = profile.id;
                user.google.token = token;
                user.google.name  = profile.displayName;
                user.google.email = profile.emails[0].value; // pull the first email
 
                user.save(function(err) {
                    if (err)
                        throw err;
                    return done(null, user);
                });
 
            }
 
        });
 
    }));
 
};