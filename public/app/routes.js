var app = angular.module('userRoutes', ['ngRoute'])

    .config(function ($routeProvider, $locationProvider) {
        $routeProvider

            .when('/register', {
                templateUrl : '/app/views/users/register.html',
                controller : 'regCtrl',
                controllerAs : 'register',
                authenticated : false
            })

            .when('/login', {
                templateUrl : '/app/views/users/login.html',
                authenticated : false
            })

            .when('/logout', {
                templateUrl : '/app/views/users/logout.html',
                authenticated : false
            })

            .when('/activate/:token', {
                templateUrl : '/app/views/users/activation/activate.html',
                authenticated : false,
                controller : 'emailCtrl',
                controllerAs : 'email'
            })

            .when('/resend', {
                templateUrl : '/app/views/users/activation/resend.html',
                authenticated : false,
                controller : 'resendCtrl',
                controllerAs : 'resend'
            })

            .when('/forgot', {
                templateUrl : '/app/views/users/forgot.html',
                authenticated : false,
                controller : 'forgotCtrl',
                controllerAs : 'forgot'
            })

            .when('/forgotPassword/:token', {
                templateUrl : 'app/views/users/resetPassword.html',
                authenticated : false,
                controller : 'resetCtrl',
                controllerAs : 'reset'
            })

            .when('/profile', {
                templateUrl : 'app/views/users/profile.html',
                authenticated : true,
                controller : 'profileCtrl',
                controllerAs : 'profile'
            })

            .when('/upload-csv', {
                templateUrl : 'app/views/admin/upload-csv.html',
                authenticated : true,
                controller : 'uploadCSVCtrl',
                controllerAs : 'uploadCSV',
                permission : 'admin'
            })

            .when('/editMatch/:matchID', {
                templateUrl : 'app/views/admin/editMatch.html',
                authenticated : true,
                controller : 'editMatchCtrl',
                controllerAs : 'editMatch',
                permission : 'admin'
            })

            .when('/match/:matchID', {
                templateUrl : 'app/views/users/match.html',
                authenticated : true,
                controller : 'matchCtrl',
                controllerAs : 'match',
                permission : 'user'
            })

            .when('/teams', {
                templateUrl : 'app/views/users/teams.html',
                authenticated : true,
                controller : 'teamsCtrl',
                controllerAs : 'teams'
            })

            .when('/users', {
                templateUrl : 'app/views/admin/users.html',
                authenticated : true,
                controller : 'usersCtrl',
                controllerAs : 'users',
                permission : 'admin'
            })

            .otherwise( { redirectTo : '/'});

        $locationProvider.html5Mode({
            enabled : true,
            requireBase : false
        })
    });

app.run(['$rootScope','auth','$location', 'user', function ($rootScope,auth,$location,user) {

    $rootScope.$on('$routeChangeStart', function (event, next, current) {

        if(next.$$route) {

            if(next.$$route.authenticated === true) {

                if(!auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/');
                } else if(next.$$route.permission) {

                    user.getPermission().then(function (data) {

                        if(next.$$route.permission !== data.data.permission) {
                            event.preventDefault();
                            $location.path('/');
                        }

                    });
                }

            } else if(next.$$route.authenticated === false) {

                if(auth.isLoggedIn()) {
                    event.preventDefault();
                    $location.path('/profile');
                }

            } /*else {
                console.log('auth does not matter');
            }
            */
        } /*else {
            console.log('Home route is here');
        }
*/
    })
}]);

