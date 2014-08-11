'use strict';

angular.module('rcForm', []).directive(rcSubmitDirective);

var app = angular.module('webApp', [
    'ngCookies',
    'ngSanitize',
    'ngRoute',
    'ui.bootstrap',
    'rcForm',
    'rcDisabledBootstrap'])

app.config(function ($routeProvider, $httpProvider) {
    $routeProvider.when('/', {
        templateUrl: '/app/views/Home.html',
        controller: 'HomeController',
        title: 'Home',
        allowAnon: true
    })
    .when('/requireauth', {
        templateUrl: '/app/views/RequireAuth.html',
        controller: 'AuthController',
        title: 'Auth Page'
    })
    .otherwise({
        redirectTo: '/'
    });

    $httpProvider.interceptors.push('AuthInterceptor');
});

app.run(function ($rootScope, SessionHandler, $location, $route) {
    $rootScope.$on('$routeChangeStart', function (event, next, current) {
        if ((next && next.$$route.allowAnon) ||
            SessionHandler.checkLoggedIn() && ($location.path() !== '' && $location.path() !== '/')) {
            $location.path();
        }
    })

    $rootScope.$on("$routeChangeSuccess", function (currentRoute, previousRoute) {
        $rootScope.title = $route.current.title;
    });
});