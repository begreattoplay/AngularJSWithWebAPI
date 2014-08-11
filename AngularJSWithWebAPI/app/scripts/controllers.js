"use strict";

app.controller('HomeController', function ($scope, $location, LoginService, SessionHandler) {

    $scope.username = SessionHandler.sessionUser.username
    $scope.someCustomColumn = SessionHandler.sessionUser.someCustomColumn;

    $scope.processLogin = function () {
        return LoginService.processLogin($scope.username, $scope.password).then(function (data) {            
            $scope.username = SessionHandler.sessionUser.username
            $scope.someCustomColumn = SessionHandler.sessionUser.someCustomColumn;
        }, function (status) {
        });
    };

    $scope.logOut = function () {
        $scope.username = '';
        $scope.password = '';
        $scope.someCustomColumn = '';
        SessionHandler.logout();        
    };

    $scope.isLoggedIn = function () {
        return SessionHandler.isLoggedIn();
    };
});

app.controller('AuthController', function ($scope) {

});