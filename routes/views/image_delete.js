var keystone = require('keystone');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// Init locals
	locals.section = 'imageDelete';

	view.on("post", function(next) {

        var data = req.body;
        console.log(data.delete);

		var q = keystone.list('Image').model.find();

	    q.where('_id').in([data.delete])
		 
	    q.remove(function(err, q) {

	    	var fs = require('fs');
			var filePath = 'C:/Users/adakoz/Desktop/matima/public/photos/' + data.pathToDelete; 
			fs.unlinkSync(filePath);

	        console.log("Usunięto zdjęcie z bazy danych: " + data.delete);

	        if(err) {
					return next(err);
				}
				req.flash("success", {detail: "Zdjęcie zostało usunięte."});
				res.redirect(req.get('referer'));
	    });



    });

	// Render the view
	view.render('image_delete');
};