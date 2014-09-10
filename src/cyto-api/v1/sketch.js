/**
 * Cyto Sketch API
 *
 * The Sketch API is used to save, retrieve and update
 * sketches when working with the front-end sketch editor.
 */


var express   = require('express')
  , nano      = require('nano')('http://localhost:5984/')
  , path      = require('path') 
  , sketchDir = path.join(__dirname, '/../../cyto-sketches/')
  , dbConfig  = require('../../cyto-db/config.js')
  , colors    = require('colors')
  , api       = new express.Router()
  , db        = nano.use(dbConfig.dbName)
  , fs        = require('fs');

  
  //write data to sketch path
  // fs.readFile(sketchBin + 'grid.js', function (err, data) {
  //   if (err) throw err;

  //   var data = data.toString("utf8", 0, data.length);
 
  //   console.log(data);
  // });



/*

Sketch API Definitions:

new
get
save
delete
list

couchdb map function:

function(doc) {
  if (doc.sketches) {
  for(var i=0; i<doc.sketches.length; i++) {
        if(doc.sketches[i].name) {
            emit(doc.sketches[i].name, doc.sketches[i]);
    }
  }
  }
}

*/

exports.sketch = function (req, res) {
  var isDefinedMethod = false;

  for(var method in api) {
    for(var key in api[method]) {
      if(req.params.name === key) {
        isDefinedMethod = true;
        api[req.method.toLowerCase()][req.params.name](req, res);
      }
    }
  }
  if(!isDefinedMethod) {
    if(req.method.toLowerCase() === 'get') {
      api.get.sketch(req, res);
    }
    if(req.method.toLowerCase() === 'post') {
      res.json({'message': 'is not a defined method'});
    }
  }
};

var api = {

  /* Get API Methods
     -------------------------------------------------- */

  get: {

    sketch: function(req, res) {

      console.log(req.params.name);

      db.view('sketches', 'by_name', {keys: [] }, function(err, body) {


          if (!err) {
            body.rows.forEach(function(doc) {
              console.log(doc.value);
            });
          } else {
            console.log(err);
          }
          
          res.json({'message': 'getting sketch by name'});



      });
    },

    /**
     * @method list
     *
     *  lists all sketches
     */

    list: function(req, res) {

      var reqData  = {}
        , respData = {};

      db.get('sketches', function(err, doc) {

        //check if _design/sketches view exists
        if(err && err.status_code == 404) {

          respData = {
            status  : 404,
            message : 'not found',
            data    : {} 
          };

        } else {
          
          respData = {
            status  : 202,
            message : 'success',
            data    : doc.sketches
          };
        }

        res.json(respData);

      });
    }

  },

  /* Post API Methods
     -------------------------------------------------- */

  post: {

    save: function(req, res) {
      var update = false;

      //res.json({'message': 'saving sketch'});

      db.get('sketches', function(err, doc) {

        //check if _design/sketches view exists
        if(err && err.status_code == 404) {
          res.json({
            status  : 500,
            message : 'internal server error',
            data    : {},
            error   : err 
          });

        } else {
          for(var key in doc.sketches) {
            if(doc.sketches[key].name === req.body.name) {
              update = true;
            }
          }
        }

        if(update) {
          //TODO: update the database meta info (consider keeping revisions??)
        }

        //essentially we don't need to do an update on the file. overwriting it is enough

        fs.writeFile(sketchDir + '_test.js', req.body.code, function (err) {
          if (err) throw err;
          console.log('It\'s saved!');
          res.json({
            status  : 202,
            message : 'success'
          });
        });

        // if(!update) {
        // } else {
        //   fs.exists(fileName, function(exists) {
        //     if (exists) {
        //       fs.stat(fileName, function(error, stats) {
        //         fs.open(fileName, "r", function(error, fd) {
        //           var buffer = new Buffer(stats.size);
           
        //           fs.read(fd, buffer, 0, buffer.length, null, function(error, bytesRead, buffer) {
        //             var data = buffer.toString("utf8", 0, buffer.length);
           
        //             console.log(data);
        //             fs.close(fd);
        //           });
        //         });
        //       });
        //     }
        //   });
        //   console.log("already exists, need to update file");
        //   //TODO: update file
        // }
      });  
    }
  }
}