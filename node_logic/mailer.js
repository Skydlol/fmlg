const nodemailer = require("nodemailer");
var path = require('path');
// create reusable transporter object using the default SMTP transport
const transporter = nodemailer.createTransport({
  pool: true,
  host: "",
  port: 25,
  secure: false, // true for 465, false for other ports
  auth: {
    user: "",
    pass: ""
  },
  tls: { rejectUnauthorized: false }
});

// send mail with defined transport object
var sendmail = function ( from, tab_to, subject, html ) {
    var to = '';
    for( let mail of tab_to) {
        to += mail + ',';
    }
    const mailOptions = {
        from: '<'+from+'>', // sender address
        to: to, // list of receivers
        subject: "OLYMPE -- " + subject, // Subject line
        // text: "Hello world?", // plain text body
        html: html, // html body,
        attachments: [
            {
                filename: 'test.nrl',
                content: new Buffer(`WORKSITE
!nrtdms:0:!session:WORKSITE:!database:x:!document:2820401,1:
[Version]
Latest=N`, 'utf-8')
            },
        ]
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          return console.log(error);
        }
        console.log("Message sent: %s", info.messageId);
        // Preview only available when sending through an Ethereal account
        // console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
      });
};

module.exports.sendmail = sendmail;
