// by Pankaj Tanwar
angular.module('mainController', ['authServices'])

.controller('mainCtrl', function ($window,$http , auth, $timeout, $location, authToken, $rootScope, user,$scope) {

    var app = this;

    app.loadme = false;
    app.home = true;

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        //console.log('user is changing routes');
        //console.log($window.location.pathname);
        if(next.$$route) {
            //console.log('we are not at home page');
            app.home = false;
        } else {
            app.home = true;
            app.matchesLoading = true;
            user.getAllMatches().then(function (data) {
                if(data.data.success) {
                    app.matches = data.data.matches;
                    app.seasonSet = new Set();
                    app.teamSet = new Set();
                    app.citySet = new Set();
                    app.matches.forEach(function (match) {
                        if(match.season) {
                            app.seasonSet.add(match.season);
                        }
                        if(match.team1) {
                            app.teamSet.add(match.team1);
                        }
                        if(match.team2) {
                            app.teamSet.add(match.team2);
                        }
                        if(match.city) {
                            app.citySet.add(match.city);
                        }
                    });

                    app.seasonArray = Array.from(app.seasonSet);
                    app.teamArray = Array.from(app.teamSet);
                    app.cityArray = Array.from(app.citySet);
                    app.limit = 10;
                    app.matchesLoading = false;
                } else {
                    app.matchesLoading = false;
                    app.errorMsg = data.data.message;
                }
            })
        }

        if(auth.isLoggedIn()) {

            //console.log('User is logged in.');
            app.isLoggedIn = true;
            auth.getUser().then(function (data){
                //console.log(data);
                app.name = data.data.name;
                app.email = data.data.email;
                app.username = data.data.username;
                user.getPermission().then(function (data) {
                    if(data.data.permission === 'admin') {
                        app.authorized = true;
                        app.loadme = true
                    } else {
                        app.authorized = false;
                        app.loadme = true;
                    }
                });
            });

        } else {

            //console.log('User is not logged in.');
            app.isLoggedIn = false;
            app.name = '';

            app.loadme = true;
        }

    });


    this.doLogin = function (logData) {
        //console.log(this.logData);
        app.successMsg = '';
        app.errorMsg = '';
        app.loading = true;
        app.expired = false;
        app.disabled = false;

        auth.login(app.logData).then(function (data) {
            //console.log(data);
            //app.loading = true;

            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message + ' Redirecting to home page...';
                $timeout(function () {
                    $location.path('/');
                    app.logData = '';
                    app.successMsg = false;
                }, 2000);

            } else {
                app.disabled = false;
                if(data.data.expired) {
                    app.disabled = true;
                    app.loading = false;
                    app.errorMsg = data.data.message;
                    app.expired = data.data.expired;
                } else {
                    app.loading = false;
                    app.errorMsg = data.data.message;
                }
            }
        });
    };

    this.logout = function () {
        auth.logout();
        $location.path('/logout');
        $timeout(function () {
            $location.path('/');
        }, 2000);
    };
});

