var keystone = require('keystone');
var nodemailer = require('nodemailer');
exports.sendEmail = function (mailOptions) {

    var fromPerson = mailOptions.from || '',
        from = mailOptions.name || '';
        fromEmail = mailOptions.email || '';
        toPerson = mailOptions.to || '',
        typeEmial = mailOptions.type || '',
        messageContent = mailOptions.message || '',
        transporter = nodemailer.createTransport(process.env.EMAIL_TRANSPORTER),

        //change if production
        server = '188.116.12.230:3000' // 188.116.12.230:3000;
        

    switch(typeEmial) {
    case 1:
    // 1. Wysyłanie maila z formularza kontaktowego
            var optionsMail = {
                from: mailOptions.from, // sender address
                to: toPerson, // list of receivers
                subject: 'MatimaStudio || Nowa wiadomość', // Subject line
                text: '<h2>Otrzymałeś wiadomość od '+ from + ' -- ' + fromEmail + ' o treści: </h2><hr><br>' + messageContent, // plaintext body
                html: '<h2>Otrzymałeś wiadomość od '+ from + ' -- ' + fromEmail + ' o treści: </h2><hr><br><h3>' + messageContent + '</h3><br><hr>'// html body
            };
        break;

        default:
            console.log("default");
            next();
    }

    // send mail with defined transport object
    transporter.sendMail(optionsMail, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);
    });

};