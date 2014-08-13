/*
 * Cyto App Widget Routes
 */

exports.ui = function (req, res) {
  var name = req.params.name;

  res.render('ui/' + name);
};