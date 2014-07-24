var users = {

  _id      : '_design/users',
  
  language : 'javascript',

  test: function() {

  },

  views    : {

    by_username : {

      map : function(doc) {

        if (doc.username) {
          emit(doc.username, doc);
        }
      }
    },

    by_email : {

      map : function(doc) {
        if (doc.local && doc.local.email) {
            emit(doc.local.email, doc);
        }
      }
    },

    by_id : {
      map : function(doc) {  
        if (doc._id) {
          emit(doc._id, doc);
        }
      }
    }
  }
};


// nano.db.create('alice', function(err, body) {
//   if (!err) {
//     console.log('database alice created!');
//   }
// });

var replacer = function (stack, undefined, r, i) {
  // a WebReflection hint to avoid recursion
  return function replacer(key, value) {
    // this happens only first iteration
    // key is empty, and value is the object
    if (key === "") {
      // put the value in the stack
      stack = [value];
      // and reset the r
      r = 0;
      return value;
    }
    switch(typeof value) {
      case "function":
        // not allowed in JSON protocol
        // let's return some info in any case
        return "".concat(
          "function ",
          value.name || "anonymous",
          "(",
            Array(value.length + 1).join(",arg").slice(1),
          "){}"
        );
      // is this a primitive value ?
      case "boolean":
      case "number":
      case "string":
        // primitives cannot have properties
        // so these are safe to parse
        return value;
      default:
        // only null does not need to be stored
        // for all objects check recursion first
        // hopefully 255 calls are enough ...
        if (!value || !replacer.filter(value) || 255 < ++r) return undefined;
        i = stack.indexOf(value);
        // all objects not already parsed
        if (i < 0) return stack.push(value) && value;
        // all others are duplicated or cyclic
        // mark them with index
        return "*R" + i;
    }
  };
}();

// reusable to filter some undesired object
// as example HTML node
replacer.filter = function (value) {
  // i.e. return !(value instanceof Node)
  // to ignore nodes
  return value;
};


console.log(JSON.stringify(users, replacer));


