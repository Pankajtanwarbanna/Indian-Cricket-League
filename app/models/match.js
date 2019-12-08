var mongoose = require('mongoose');
var titlize = require('mongoose-title-case');
mongoose.set('useCreateIndex', true);

var matchSchema = new mongoose.Schema({
    season : {
        type : Number
    },
    city : {
        type : String
    },
    date : {
        type : String
    },
    team1 : {
        type : String
    },
    team2 : {
        type : String
    },
    toss_winner : {
        type : String
    },
    toss_decision : {
        type : String
    },
    result : {
        type : String
    },
    dl_applied : {
        type : Number
    },
    winner : {
        type : String
    },
    win_by_runs : {
        type : Number
    },
    win_by_wickets : {
        type : Number
    },
    player_of_match : {
        type : String
    },
    venue : {
        type : String
    },
    umpire1 : {
        type : String
    },
    umpire2 : {
        type : String
    },
    umpire3 : {
        type : String
    },
    timestamp : {
        type : Date,
        required : true,
        default : new Date()
    }
});

// Mongoose title case plugin
matchSchema.plugin(titlize, {
    paths: [ 'city','team1','team2','toss_winner','winner','player_of_match','venue','umpire1','umpire2','umpire3'], // Array of paths
});

module.exports = mongoose.model('Match',matchSchema);
