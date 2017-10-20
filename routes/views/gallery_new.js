var keystone = require("keystone");
var async = require("async");



exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
    var locals = res.locals;

    locals.section = "gallery_new";
    locals.form = req.body;

    view.on("post", function(next) {

        locals.form = req.body;
        locals.user = req.user;

        var data = req.body;
        var errors = [];

        async.series([
            function(cb) {
                // 1. Walidacja wszystkich podanych danych dla reklamacji
                if(!data.albumName) {
                    errors.push("Nie podano nazwy albumu.");
                }

                if(!data.eventDate) {
                    errors.push("Nie podano daty wydarzenia.");
                }

                if(!data.client) {
                    errors.push("Nie podano adresu e-mail klienta.");
                }

                if(!data.guest) {
                    errors.push("Nie podano gościa.");
                }

                if(!data.gallery) {
                    errors.push("Nie podano galerii.");
                }

                if(!data.imageHero) {
                    errors.push("Nie podano zdjęcia główengo.");
                }

                errors.forEach(function(err) {
                	console.log(errors);
                    req.flash("error", err);
                });

                if(errors.length) {
                    return cb(true);
                }
                cb();

            },
            function(cb) {
                // 2. Zapisanie zdjęć nowego albumu

                var albumData = {
                    name: data.albumName,
                    eventDate: data.eventDate,
                    clientReference: data.client,
                    guestReference: data.guest,
                    galleryReference: data.gallery,
                    heroImage: data.imageHero,
                };

                var Gallery = keystone.list("Gallery").model,
                    album = new Gallery(albumData);


                album.save(function(err){
                    if(err){
                        console.log('wystąpił błąd');
                        console.log(err);
                        cb(true);
                    }else{
                        cb();
                    }
                });
                
                
            },
            function(cb) {
                // 3. Zapisanie zdjęć do galerii
                var folder = 'public/photos/' + data.gallery;
                var photosNames = [];
                console.log(folder);
                var fs = require('fs');

                fs.readdirSync(folder).forEach(file => {

                	var imageData = {
	                    title: file,
	                    galleryReference: data.gallery
	                };

			  		var Image = keystone.list("Image").model,
                    image = new Image(imageData);

                    image.save(function(err){
	                    if(err){
	                        console.log('wystąpił błąd');
	                    }
                	});                    
				})

                cb();                
            },

        ], function(err) {

            if(err) {
                return next();
                
            }
                      
            req.flash("success", {detail: "Album został prawidłowo zapisany"});
            res.redirect(req.get('referer'));

        });

    });

    view.render("gallery_new");
};
