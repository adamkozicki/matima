var keystone = require("keystone");
var async = require("async");

exports = module.exports = function(req, res) {

    if(req.user) {
        return res.redirect("/");
    }

    var view = new keystone.View(req, res);
    var locals = res.locals;
    var emailToLog = "";

    locals.section = "logowanie";
    locals.form = req.body;

    view.on("post", function(next) {

        var data = req.body;
        var errors = [];
        
        async.series([
            function(cb) {
                // 1. Sprawdzanie czy podano dane do logowania
                if(!data.login || !data.password) {
                    console.log("Podaj login i hasło");
                    req.flash("error", "Podaj login i hasło.");
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
                // 2. Sprawdzenie czy użytkownik istnieje
                keystone.list("User").model.findOne({
                    login: data.login
                }, function(err, user) {
                    
                    if(err || !user) {
                        req.flash("error", "Niepoprawny login lub hasło.");
                        console.log("Niepoprawny login lub hasło.");
                        return cb(true);
                    }
                    emailToLog = user.email;
                    cb();

                });

            },
            function(cb) {
                // 3. sprawdzanie czy użytkownik został aktywowany
                keystone.list("User").model.findOne({
                    login: data.login,
                    isActive: false
                }, function(err, user) {

                    if(err || user) {
                        req.flash("error", "Prosimy jeszcze o chwilkę cierpliwości Zdjęcia wkrótce pojawią się na serwerze.");
                        console.log("Prosimy jeszcze o chwilkę c")
                        return cb(true);
                    }

                    cb();

                });

            },
            function(cb) {
                keystone.session.signin(
                {
                    email: emailToLog,
                    password: data.password
                }, req, res, function() {
                    res.redirect("/");
                }, function(err) {
                    req.flash("error", "Podałeś nieprawidłowe dane. Spróbuj ponownie.");
                    console.log(req.flash('error'));
                    next();
                });
                
                cb();
            }
        ], function(err) {

            if(err) {
                return next();
            };

       });

    });

    view.render("login");
};