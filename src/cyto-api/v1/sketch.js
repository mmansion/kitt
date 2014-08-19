/**
 * Cyto Sketch API
 *
 * The Sketch API is used to save, retrieve and update
 * sketches when working with the front-end sketch editor.
 */


var express  = require('express')
  , nano     = require('nano')('http://localhost:5984/') 
  , dbConfig = require('../../cyto-db/config.js')
  , colors   = require('colors')
  , api      = new express.Router()
  , db       = nano.use(dbConfig.dbName);
 
/*

Sketch API Definitions:

new
get
save
delete
list

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
    res.json({'message': 'is not a defined method'});
  }
};

var api = {

  /* Get API Methods
     -------------------------------------------------- */

  get: {

    sketch: function(req, res) {

      res.json({'message': 'getting sketch by name'});
    },

    /**
     * @method list
     *
     *  lists all sketches
     */

    list: function(req, res) {

      var reqData  = {}
        , respData = {};

      //res.json({'message': 'listing sketches'});
      db.get('sketches', function(err, doc) {

        //check if _design/users view exists
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

    
  }
}