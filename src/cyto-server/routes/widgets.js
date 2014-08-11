/*
 * Cyto App Widget Routes
 */

exports.widgets = function (req, res) {
  var name = req.params.name;

  res.render('widgets/' + name);
};