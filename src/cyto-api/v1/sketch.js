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
  api[req.method.toLowerCase()][req.params.name](req, res);
};

var api = {

  /* Get API Methods
     -------------------------------------------------- */

  get: {

  }

  /* Post API Methods
     -------------------------------------------------- */

  post: {

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
  }
}