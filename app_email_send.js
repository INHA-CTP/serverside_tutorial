//http://blog.saltfactory.net/send-mail-using-nodemailer/

'use strict';
const nodemailer = require('nodemailer');

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'userID@gmail.com',
        pass: 'password'
    }
});

// setup email data with unicode symbols
let mailOptions = {
    from: '"name" <sdsd@gmail.com>', // sender address
    to: 'sdsd@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
        return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
});


// var nodemailer = require('nodemailer');
//
// var smtpTransport = nodemailer.createTransport("SMTP", {
//     service: 'Gmail',
//     auth: {
//       user: 'userID@gmail.com',
//       pass: 'password'
//     }
// });
//
// var mailOptions = {
//     from: 'name <id1@gmail.com>',
//     to: 'id2@gmail.com',
//     subject: 'Nodemailer 테스트',
//     // text: '평문 보내기 테스트 '
//     html:'<h1>HTML 보내기 테스트</h1><p><img src="http://www.nodemailer.com/img/logo.png"/></p>'
// };
//
//
// smtpTransport.sendMail(mailOptions, function(error, response){
//
//     if (error){
//         console.log(error);
//     } else {
//         console.log("Message sent : " + response.message);
//     }
//     smtpTransport.close();
// });

//https://jaewonism.com/posts/16?page=1

//$ npm install --save nodemailer nodemailer-smtp-pool

// {
//   "mailer": {
//     "service": "Gmail",
//     "host": "localhost",
//     "port": "465",
//     "user": "USER_ID@gmail.com",
//     "password": "PA55W0RD"
//   }
// }

// var nodemailer = require('nodemailer');
// var smtpPool = require('nodemailer-smtp-pool');
// var config = require('./config/config.json');
// var sender = '보내는 사람 < SENDER@gmail.com >';
// var receiver = 'RECEIVER@gmail.com';
// var mailTitle = '메일 제목';
// var html = '<h1>HTML TEST</h1>';
// var mailOptions = {
//   from: sender,
//   to: receiver,
//   subject: mailTitle,
//   html: html
// };
// var transporter = nodemailer.createTransport(smtpPool({
//   service: config.mailer.service,
//   host: config.mailer.host,
//   port: config.mailer.port,
//   auth: {
//     user: config.mailer.user,
//     pass: config.mailer.password
//   },
//   tls: {
//     rejectUnauthorize: false
//   },
//   maxConnections: 5,
//   maxMessages: 10
// }));
// transporter.sendMail(mailOptions, function (err, res) {
//   if (err) {
//     console.log('failed... => ' + err);
//   } else {
//     console.log('succeed... => ' + res);
//   }
//   transporter.close();
// });
