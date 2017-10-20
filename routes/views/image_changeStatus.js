var keystone = require("keystone");

exports = module.exports = function(req, res) {

    var view = new keystone.View(req, res);
   
    var locals = res.locals;

    locals.section = "changeStatus";

    view.on("post", function(next) {

        var data = req.body;
        console.log(data.status);
  
        var q = keystone.list('Image').model
                .findOne({
                    _id: data.status
                }, function(err, row) {

                    if(err) {
                        return;
                    }

                if(row.state == 'Publiczne')
                {
                    row.state = 'Prywatne'
                }
                else
                {
                    row.state = 'Publiczne'
                }

                row.save(function(err, row) {

                    if(err) {
                        return;
                    }
                    console.log("Zmieniono status");
                    locals.actuallStatus = row.state;
                    req.flash("success", {detail: "Pomyślnie zmieniono status zdjęcia."});
                    res.redirect(req.get('referer'));
                });
            });                    
    });

    view.render('image_changeStatus');
};
