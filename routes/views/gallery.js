var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;
	console.log(req.user.email);
	var clientRef = req.user.clientReference;

	// Set locals
	locals.section = 'gallery';

	// Load the galleries by sortOrder
	view.query('galleries', keystone.list('Gallery').model.find({
		clientReference: clientRef
	}).sort('sortOrder'));

	// Render the view
	view.render('gallery');

};
