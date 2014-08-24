//cyto-auth/auth-config.js

// expose our config directly to our application using module.exports
module.exports = {

  /**
  * FACEBOOK AUTH CONFIG
  *
  * Facebook's Developer Portal
  * https://developers.facebook.com/
  *
  * 1) Create a new application
  * 2) Set the callback URL to http://localhost:3333/auth/facebook/callback
  *    This will ensure that our application will authenticate with Facebook and 
  *    redirect users back to our application after they have approved access for 
  *    our application. The callback will be where we store the user details that we need.
  * 3) Add the client ID and client secret to the auth config object below.
  *
  *   Live vs Sandbox: 
  *   Having your application in sandbox mode means only you can log into the application. 
  *   Live means logins are available for everyone.
  */

  'facebookAuth' : {
    'clientID'       : '', // your App ID
    'clientSecret'   : '', // your App Secret
    'callbackURL'    : 'http://localhost:8080/auth/facebook/callback'
  },

  /**
  * TWITTER AUTH CONFIG
  *
  * Twitter's Developer Portal
  * http://dev.twitter.com/
  *
  * 1) Create a new application
  * 2) Set the callback URL to http://localhost:3333/auth/twitter/callback
  *    The ip might need to be in the form http://127.0.0.1:3333/auth/twitter/callback
  * 3) Add the consumer key and consumer secret to the auth-config object below.
  */

  'twitterAuth' : {
    'consumerKey'    : '',
    'consumerSecret' : '',
    'callbackURL'    : 'http://localhost:8080/auth/twitter/callback'
  },

  /**
  *
  * Googles's Cloud API Console
  * http://cloud.google.com/
  *
  * Applications can be found under Project/APIs & auth
  *
  * 1) Create a new application 
  * 2) Set the redirect URL to http://localhost:3333/auth/google/callback
  *    The IP might need to be in the form http:/127.0.0.1:3333/auth/google/callback
  * 2) Add the client ID and client secret to the auth config object below.
  */

  'googleAuth' : {
    'clientID'       : '',
    'clientSecret'   : '',
    'callbackURL'    : 'http://localhost:8080/auth/google/callback'
  }
};