// By Pankaj Tanwar - 8 Dec 2019
var User = require('../models/user');
var Match = require('../models/match');
let auth = require('../auth/authPermission');
var jwt = require('jsonwebtoken');
var secret = 'Indian-Cricket-League';
var nodemailer = require('nodemailer');
var sgTransport = require('nodemailer-sendgrid-transport'); // for sendgrid
var csvtojson = require("csvtojson");
let multer = require('multer');

// storage
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __basedir + '/public/uploads/')
    },
    filename: function (req, file, cb) {

        if(!file.originalname.match(/\.(csv|CSV)$/)) {
            let err = new Error();
            err.code = 'filetype';
            return cb(err);
        } else {
            cb(null,Date.now() + '_' + file.originalname.replace(/ /g,'')) // replace - to remove all white spaces
        }
    }
});
// upload function
var upload = multer({
    storage: storage,
    limits : { fileSize : 100000000000000 }
}).single('csv');

module.exports = function (router){

    // Upload CSV data API
    router.post('/upload-csv', auth.ensureAdmin, function (req, res) {

        upload(req, res, function (err) {
            if (err) {
                if(err.code === 'LIMIT_FILE_SIZE') {
                    res.json({
                        success : false,
                        message : 'File is too large.'
                    })
                } else if(err.code === 'filetype') {
                    res.json({
                        success : false,
                        message : 'File type invalid.'
                    })
                } else {
                    res.json({
                        success : false,
                        message : 'File was not able to be uploaded'
                    })
                }
            } else {

                if(!req.file) {
                    res.json({
                        success: false,
                        message: 'File missing.'
                    })
                } else {

                    csvtojson().fromFile(__basedir + '/public/uploads/' + req.file.filename).then(function (jsonData) {

                        Match.insertMany(jsonData , function (err, documents) {
                            if(err) {
                                console.log(err);
                                res.json({
                                    success : false,
                                    message : 'Something went wrong!'
                                })
                            } else {
                                res.json({
                                    success : true,
                                    message : 'CSV successfully uploaded!'
                                })
                            }
                        })
                    });
                }
            }
        })
    });

    // get details of a match
    router.get('/getMatchDetails/:matchID', auth.ensureAdmin, function (req, res) {
        Match.findOne({ _id : req.params.matchID }).lean().exec(function (err, match) {
            if(err) throw err;

            if(!match) {
                res.json({
                    success : false,
                    message : 'Match not found.'
                })
            } else {
                res.json({
                    success : true,
                    match : match
                })
            }
        })
    });

    // update match details
    router.post('/updateMatch', auth.ensureAdmin, function (req, res) {
        Match.findByIdAndUpdate({ _id : req.body._id }, req.body, function (err) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                res.json({
                    success : true,
                    message : 'Match details updated successfully.'
                })
            }
        })
    });

    return router;
};
