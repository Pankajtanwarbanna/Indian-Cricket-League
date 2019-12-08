angular.module('uploadFileService', [])

.service('uploadFile', function ($http) {

    // Upload CSV file
    this.uploadCSV = function (file) {

        let fd = new FormData();

        fd.append( 'csv', file.csv);

        return $http.post('/adminApi/upload-csv', fd, {
            transformRequest: angular.identity,
            headers : { 'content-type' : undefined }
        })
    };
});
