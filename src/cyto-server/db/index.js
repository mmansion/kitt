var nano   = require('nano')('http://localhost:5984/') 
  , cytodb = nano.use('cytodb')
  , bcrypt = require('bcrypt-nodejs');

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

module.exports = {


};