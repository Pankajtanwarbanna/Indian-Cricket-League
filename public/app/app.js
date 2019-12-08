angular.module('userApp', ['userRoutes','userCtrl','mainController','emailController','adminCtrl'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
