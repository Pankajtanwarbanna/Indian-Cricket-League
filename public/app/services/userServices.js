/*
    Services written by - Pankaj tanwar
*/
angular.module('userServices',[])

.factory('user', function ($http) {
    var userFactory = {};

    // user.create(regData);
    userFactory.create = function (regData) {
        return $http.post('/api/register' , regData);
    };

    // user.activateAccount(token);
    userFactory.activateAccount = function (token) {
        return $http.put('/api/activate/'+token);
    };

    // user.resendLink(logData);
    userFactory.checkCredientials = function (logData) {
        return $http.post('/api/resend',logData);
    };

    // user.resendEmail(username);
    userFactory.resendEmail = function (username) {
        return $http.put('/api/sendlink', username);
    };

    // user.forgotUsername(email);
    userFactory.forgotUsername = function (email) {
        return $http.post('/api/forgotUsername', email);
    };

    // user.forgotPasswordLink(username);
    userFactory.forgotPasswordLink = function (username) {
        return $http.put('/api/forgotPasswordLink', username);
    };

    // user.forgotPasswordCheckToken(token);
    userFactory.forgotPasswordCheckToken = function (token) {
        return $http.post('/api/forgotPassword/'+token);
    };

    // user.resetPassword(token,password);
    userFactory.resetPassword = function (token,password) {
        return $http.put('/api/resetPassword/'+token, password);
    };

    // user.getPermission();
    userFactory.getPermission = function () {
        return $http.get('/api/permission');
    };

    // get all matches
    userFactory.getAllMatches = function () {
        return $http.get('/api/getAllMatches');
    };

    // get details of the match
    userFactory.getMatchDetails = function (matchID) {
        return $http.get('/api/getMatchDetails/' + matchID);
    };

    // get user profile
    userFactory.getUserProfile = function () {
        return $http.get('/api/getUserProfile');
    };

    // update profile
    userFactory.updateProfile = function (profile) {
        return $http.post('/api/updateProfile', profile);
    };

    return userFactory;
});
