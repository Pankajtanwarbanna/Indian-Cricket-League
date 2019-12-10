/*
    Controller written by - Pankaj tanwar
*/
angular.module('userCtrl',['userServices'])

.controller('regCtrl', function ($scope, $http, $timeout, $location,user) {

    var app = this;

    this.regUser = function (regData) {

        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;

        user.create(app.regData).then(function (data) {

            //console.log(data);
            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + ' Redirecting to home page...';
                $timeout(function () {
                    $location.path('/');
                }, 2000);
                
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        });
    };
})

.controller('profileCtrl', function (user, $timeout) {

    var app = this;

    // get user profile
    user.getUserProfile().then(function (data) {
        if(data.data.success) {
            app.profile = data.data.user;
        } else {
            app.errorMsg = data.data.message;
        }
    });

    // update user profile
    app.updateProfile = function (profile) {
        user.updateProfile(profile).then(function (data) {
            if(data.data.success) {
                app.successMsg = data.data.message;
                $timeout(function () {
                    app.successMsg = '';
                }, 3000)
            } else {
                app.errorMsg = data.data.message;
            }
        })
    }
})

.controller('teamsCtrl', function (user) {
    var app = this;

    app.fav = 'Sunrisers Hyderabad';
    app.teamsLoading = true;

    user.getAllMatches().then(function (data) {

        if(data.data.success) {
            app.matches = data.data.matches;
            app.teamSet = new Set();
            app.matches.forEach(function (match) {
                app.teamSet.add(match.team1);
            });
            app.teams = Array.from(app.teamSet);
            app.teamsLoading = false;
        } else {
            app.errorMsg = data.data.message;
            app.teamsLoading = false;
        }
    })
})

.controller('matchCtrl', function (user,$routeParams) {
    var app = this;

    user.getMatchDetails($routeParams.matchID).then(function (data) {
        console.log(data);
        if(data.data.success) {
            app.match = data.data.match;
        } else {
            app.errorMsg = data.data.message;
        }
    })
});
