// By Pankaj Tanwar - 8 Dec 2019
angular.module('adminServices',[])

.factory('admin', function ($http) {
    var adminFactory = {};

    // get details of the match
    adminFactory.getMatchDetails = function (matchID) {
        return $http.get('/adminApi/getMatchDetails/' + matchID);
    };

    // update match details
    adminFactory.updateMatch = function (match) {
        return $http.post('/adminApi/updateMatch', match);
    };

    return adminFactory;
});
