/*
 * Cyto App Routes
 */


// var partials = {

//   name: function(req, res) {
//     res.json({
//       name: 'Bob'
//     });
//   }
// }

// module.exports = partials;


exports.partials = function (req, res) {
  var name = req.params.name;

  console.log(name);
  res.render('partials/' + name);
};