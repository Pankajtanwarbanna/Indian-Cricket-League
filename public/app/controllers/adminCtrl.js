/*
    Controller written by - Pankaj tanwar
*/
angular.module('adminCtrl',['adminServices','fileModelDirective','uploadFileService'])

.controller('uploadCSVCtrl', function (uploadFile, $scope) {

    var app = this;

    app.uploadCSVFile = function () {
        app.loading = true;
        uploadFile.uploadCSV($scope.file).then(function (data) {
            console.log(data);
            if(data.data.success) {
                app.loading = false;
                app.successMsg = data.data.message;
            } else {
                app.loading = false;
                app.errorMsg = data.data.message;
            }
        })
    }
})

.controller('editMatchCtrl', function (admin,$routeParams,$timeout) {

    var app = this;

    // get match details from database
    admin.getMatchDetails($routeParams.matchID).then(function (data) {
        if(data.data.success) {
            app.match = data.data.match;
        } else {
            app.errorMsg = data.data.message;
        }
    });

    // update match details
    app.updateMatch = function (match) {
        admin.updateMatch(match).then(function (data) {
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


.controller('usersCtrl', function (admin) {

    var app = this;

    app.usersLoading = true;

    // get all users from database
    admin.getAllUsers().then(function (data) {
        if(data.data.success) {
            app.usersLoading = false;
            app.allUsers = data.data.users;
        } else {
            app.usersLoading = false;
            app.errorMsg = data.data.message;
        }
    })
});
