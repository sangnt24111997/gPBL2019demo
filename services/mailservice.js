var nodemailer = require('nodemailer');
var xoauth2 = require('xoauth2');
const mailServiceInfo = require('../config/dev');

module.exports = function(value){
    var transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            type: 'OAuth2',
            user: mailServiceInfo.user,
            clientId: mailServiceInfo.clientId,
            clientSecret: mailServiceInfo.clientSecret,
            refreshToken: mailServiceInfo.refreshToken,
            accessToken: mailServiceInfo.accessToken
        }
    });
    
    var mailOptions = {
        from: mailServiceInfo.user,
        to: 'sang24111997@gmail.com',
        subject: 'demo sending email by using nodemailer',
        text: 'hi, your trash can is quite full right now, it reach '+value+'%'
    }
    transporter.sendMail(mailOptions, function(err, info){
        if(err){
            console.log(err);
        } else {
            console.log('Email sent: '+ info.response);
        }
    });
}