let User = require('../models/user');

function ensureAdmin(req, res, next) {
    if(!req.decoded.email) {
        res.json({
            success : false,
            message : 'You are not logged in.'
        })
    } else {
        User.findOne({ email : req.decoded.email }).select('permission').lean().exec(function (err, user) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!user) {
                    res.json({
                        success : false,
                        message : 'User not found.'
                    })
                } else {
                    if(user.permission === 'admin') {
                        next();
                    } else {
                        res.json({
                            success : false,
                            message : 'You are not authorized.'
                        })
                    }
                }
            }
        });
    }
}

function ensureUser(req, res, next) {
    if(!req.decoded.email) {
        res.json({
            success : false,
            message : 'You are not logged in.'
        })
    } else {
        User.findOne({ email : req.decoded.email }).select('permission').lean().exec(function (err, user) {
            if(err) {
                res.json({
                    success : false,
                    message : 'Something went wrong!'
                })
            } else {
                if(!user) {
                    res.json({
                        success : false,
                        message : 'User not found.'
                    })
                } else {
                    if(user.permission === 'user') {
                        next();
                    } else {
                        res.json({
                            success : false,
                            message : 'You are not authorized.'
                        })
                    }
                }
            }
        });
    }
}

module.exports = {
    ensureAdmin,
    ensureUser
};
