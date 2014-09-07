/*
 * Cyto App Widget Routes
 */

exports.modules = function (req, res) {
  var name = req.params.name;

  res.render('modules/' + name);
};