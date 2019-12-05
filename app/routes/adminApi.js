// By - Pankaj Tanwar (5 Dec. 2019)
var User = require('../models/user');
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport'); // for sendgrid

module.exports = function (router){

    // Nodemailer-sandgrid stuff
    var options = {
        auth: {
            api_key: 'YOUR_API_KEY'
        }
    };

    var client = nodemailer.createTransport(sgTransport(options));



    return router;
}
