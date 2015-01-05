angular.module('app').controller('mvNavbarLoginCtrl', function($scope, $http, $location, mvIdentity, mvNotifier, mvAuth) {
    $scope.identity = mvIdentity;
    $scope.signin = function(username, password) {
        mvAuth.login(username, password)
            .then(function(success) {
                if (success) {
                    mvNotifier.notify('You have successfully authenticated.');
                }
                else {
                    mvNotifier.notify('Authentication failed, sucker!');
                }
            });
    };
    $scope.signout = function() {
        mvAuth.logout().then(function() {
            mvNotifier.notify('You have successfully signed out!');
            $location.path('/');
        })
    }
});
