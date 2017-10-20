var keystone = require('keystone');
var async = require("async");
var sizeOf = require('image-size');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	locals.form = req.body;

	// Init locals
	locals.section = 'images';

	// Load the posts
	view.on('init', function (next) {

		if (req.params.gallery) {          
			locals.gallery = req.params.gallery;
        }
	
		async.series([
			function(cb) {
				var q2 = keystone.list('Gallery').model.find()

					if(req.params.gallery) {
						q2.where(
                            {
                                'galleryReference' : req.params.gallery,                                
                            }
                        );
					}

					q2.exec(function (err, results) {					
						locals.gallery = results;
						cb();
					});					
			},
			function(cb) {
				var q = keystone.list('Image').model.find();

					if(locals.user.isClient == true){
						q.where('galleryReference').in([req.params.gallery]) && q.where('state').in(['Publiczne', 'Prywatne'])
					}
					else{
						q.where('galleryReference').in([req.params.gallery])&& q.where('state').in(['Publiczne'])
					}

					q.exec(function (err, results) {
						locals.images = results;
						cb();
					});	
			},
			function(cb) {

				var fs = require('fs');

				var arrayPhoto = [];

				Object.keys(locals.images).map(function(objectKey, index) {
					var value = locals.images[objectKey];
					var filename = 'public/photos/' + value.galleryReference + '/' + value.title;

					fs.exists(filename, function(exists) {
					  if (exists) {

					  	var dimm = sizeOf('public/photos/' + value.galleryReference + '/' + value.title);

				    	arrayPhoto.push({id: value.id, state: value.state, galleryReference: value.galleryReference, title: value.title, isClient: req.user.isClient,  height: dimm.height , width: dimm.width });
		
					  } else {

					    var q = Image = keystone.list('Image').model.find();

					    q.where('galleryReference').in([value.galleryReference]) && q.where('title').in([value.title]);
						 
					    q.remove(function(err) {
						        console.log(filename + ": nie ma takiego pliku - usunięto.");
						    });
					  }
					});
				    
				    
				});

				locals.imagesInfo = arrayPhoto;
				locals.user = req.user;
				cb(true);

				// var arrayPhoto = [];

				// Object.keys(locals.images).map(function(objectKey, index) {
				//     var value = locals.images[objectKey];
				//     var dimm = sizeOf('public/photos/' + value.galleryReference + '/' + value.title);

				//     arrayPhoto.push({id: value.id, galleryReference: value.galleryReference, title: value.title, height: dimm.height , width: dimm.width });
				// });

				// locals.imagesInfo = arrayPhoto;
				// locals.userIsClient = req.user.isClient;
				// cb(true);
			}

		], function(err, results) {
			
			if(err) {
                return next();
            }
		});
	});

	// Render the view
	view.render('images');
};