angular.module('userApp', ['userRoutes','userCtrl','mainController','emailController'])

.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptors');
});
