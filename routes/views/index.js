var keystone = require('keystone');
var async = require("async");
var sendEmail = require('./sendEmail');

exports = module.exports = function (req, res) {

	var view = new keystone.View(req, res);
	var locals = res.locals;

	// locals.section is used to set the currently selected
	// item in the header navigation.
	locals.section = 'home';

    view.on("post", function(next) {

        var data = req.body;
        locals.form = req.body;
        var errors = [];
        
        async.series([
            function(cb) {
                // 1. Sprawdzanie czy podano dane w formularzu
                if(!data.name) {
                    req.flash("error", {detail: "Podaj imię"});
                    return next();
                }

                if(!data.email) {
                    req.flash("error", {detail: "Podaj adres e-mail"});
                    return next();
                }

                if(!data.message) {
                    req.flash("error", {detail: "Wpisz treść wiadomości"});
                    return next();
                }

                errors.forEach(function(err) {
                    req.flash("error", err);
                });

                if(errors.length) {
                    return cb(true);
                }

                cb();

            },
	        function(cb) {

	            // setup e-mail data with unicode symbols
	            var mailOptions = {
	                type: 1,
	                from: '"MatimaStudio" studiomatima@gmail.com', // sender address
	                to: '"MatimaStudio" studiomatima@gmail.com', // list of receivers
	                name: data.name,
	                email: data.email,
	                message: data.message
	            };

	            sendEmail.sendEmail(mailOptions);

	            cb();

	        },
        ], function(err) {

            if(err) {
                return next();
            };

            req.flash("success", {detail: "Wiadomość pomyślnie wysłana."});
            res.redirect("/#contact");

       });

    });

	// Render the view
	view.render('index');
};
