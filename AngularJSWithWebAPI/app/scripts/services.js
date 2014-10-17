'use strict';

app.factory('AuthInterceptor', ['$window', '$q', '$rootScope', '$location', function ($window, $q, $rootScope, $location) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.getItem('token')) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.getItem('token');
            }
            return config || $q.when(config);
        },
        requestError: function (rejection) {
            return $q.reject(rejection);
        },
        response: function (response) {
            return response || $q.when(response);
        },
        responseError: function (rejection) {
            return $q.reject(rejection);
        }
    };
}]);

//LoginService
app.factory('LoginService', ['$q', '$http', 'SessionHandler', function ($q, $http, SessionHandler) {
    var processLogin = function (username, password) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            data: "username=" + username + "&password=" + password + "&grant_type=password",
            async: false,
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            url: '/Token',
            isArray: false
        }).success(function (data, status) {
            return SessionHandler.setLoggedInToken(data.access_token).then(function () {
                deferred.resolve();
            });
        }).error(function (data, status) {
            SessionHandler.removeLoggedInToken();
            deferred.reject(status);
        });

        return deferred.promise;
    };

    var processLogout = function () {
        SessionHandler.logout();
    };

    var register = function (model) {
        var deferred = $q.defer();
        $http({
            method: 'POST',
            url: '/api/v1/Account/Register',
            data: model
        }).success(function (data, status) {
            deferred.resolve();
        }).error(function (data, status) {
            deferred.reject();
        });

        return deferred.promise;
    }

    return {
        processLogin: processLogin,
        processLogout: processLogout,
        register: register
    };
}]);


//Session Handler
app.factory('SessionHandler', ['$http', '$location', '$window', '$q', function ($http, $location, $window, $q) {
    var setLoggedIn = function (data) {
        if (data === 'true') {
            s['auth'] = true;
            sessionStorage.data = angular.toJson(s);
        }
        else {
            redirectHome();
        }
    };

    var redirectHome = function () {
        s = {};
        sessionStorage.data = angular.toJson(s);
        if ($location.path() !== '/' && $location.path() !== '/')
            $location.path('/', true);
    };
    var setSessionItem = function (name, value) {
        $window.sessionStorage.setItem(name, value);
    };
    var setLoggedInToken = function (token) {
        setSessionItem('token', token);
        var deferred = $q.defer();

        $http({
            method: 'GET',
            async: false,
            url: '/api/v1/Users/Login'
        }).success(function (data, status) {
            setSessionItem('username', data.UserName);
            setSessionItem('someCustomColumn', data.SomeCustomColumn);
            setLoggedIn('true');
            updateSessionUser();
            deferred.resolve();
        }).error(function (data, status) {
            removeSessions();
            deferred.reject(data);
        });

        return deferred.promise;
    };
    var sessionUser = {};
    sessionUser.username = $window.sessionStorage.username;;
    sessionUser.someCustomColumn = $window.sessionStorage.someCustomColumn;

    var updateSessionUser = function () {
        sessionUser.username = $window.sessionStorage.username;
        sessionUser.someCustomColumn = $window.sessionStorage.someCustomColumn;
    };

    var isLoggedIn = function() {
        return $window.sessionStorage.token != null;
    }

    var removeSessions = function () {
        $window.sessionStorage.removeItem('token');
        $window.sessionStorage.removeItem('username');
        $window.sessionStorage.removeItem('someCustomColumn');
    };

    var removeLoggedInToken = function () {
        removeSessions();
    };

    if (angular.isDefined(sessionStorage.init)) {
        var s = angular.fromJson(sessionStorage.data);
    } else {
        var s = {};
        sessionStorage.init = true;
        sessionStorage.data = angular.toJson(s);
    }

    return {
        set: function (key, val) {
            s[key] = val;
            sessionStorage.data = angular.toJson(s);
        },
        get: function (key) {
            if (!angular.isDefined(s[key])) {
                return false;
            }
            return s[key];
        },
        logout: function () {
            removeLoggedInToken();
            s = {};
            sessionStorage.data = angular.toJson(s);
            sessionStorage.clear();
        },
        checkLoggedIn: function () {
            if (s['auth']) {
                return true;
            } else {
                $http.post('/api/v1/Account/AuthStatus').success(setLoggedIn).error(redirectHome);
            }
        },
        setLoggedInToken: setLoggedInToken,
        removeLoggedInToken: removeLoggedInToken,
        sessionUser: sessionUser,
        isLoggedIn: isLoggedIn
    };
}]);