var FootballApp = angular.module('FootballApp', ['angularUtils.directives.dirPagination', "ui.bootstrap"]);



FootballApp.factory('AddPlayerService', [
    '$http', 'dotnetapi', function ($http, dotnetapi) {

        AdminObj = {};

        AdminObj.AddPlayerDetails = function (obj) {
            var AdminLogin;

            AdminLogin = $http({
                method: 'Post', url: dotnetapi + 'Playersapi/AddPlayer ', data: obj
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });

            return AdminLogin;
        }



        AdminObj.UpdatePlayerDetails = function (obj) {
            var AdminLogin;
            AdminLogin = $http({
                method: 'Put', url: dotnetapi + 'Playersapi/Update ', data: obj
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return AdminLogin;
        }

        AdminObj.GetPlayerById = function (Id) {
            var AdminLogin;

            AdminLogin = $http({
                method: "Get", url: dotnetapi + 'Playersapi/all?id=' + Id
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return AdminLogin;
        };

        AdminObj.DeletePlayerById = function (Id) {
            var AdminLogin;

            AdminLogin = $http({
                method: "Delete", url: dotnetapi + 'Playersapi/Delete?id=' + Id
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return AdminLogin;
        };

        AdminObj.AllPlayers = function () {
            var AdminLogin;

            AdminLogin = $http({
                method: "Get", url: dotnetapi + 'Playersapi/all'
            }).
                then(function (response) {
                    return response;
                }, function (error) {
                    return error;
                });
            return AdminLogin;
        };



        return AdminObj;


    }]);

FootballApp.controller('AddPlayerController', [
    '$scope', 'AddPlayerService',
    function ($scope, AddPlayerService) {

        $scope.AddPlayerDetails = function (AddPlayer) {
            
            AddPlayerService.AddPlayerDetails($scope.AddPlayer).then(function (result) {
                    if (result.status === 200) {
                        if (result.data.isSuccess) {
                            $scope.PlayerObj = result.data.Data;
                            location.reload();
                        }
                        else {
                            $scope.Message = result.data.Message;
                            alert($scope.Message);
                        }
                    }
                });
            
        };


        $scope.UpdatePlayerDetails = function (PlayerDetails) {

            
            AddPlayerService.UpdatePlayerDetails(PlayerDetails).then(function (result) {
                    if (result.status === 200) {
                        if (result.data.isSuccess) {
                            alert(result.data.Message);
                            location.reload();

                        }
                        else {
                            $scope.Message = result.data.Message;
                            alert($scope.Message);
                        }
                    }
                });
            
        };


        $scope.GetPlayerById = function (Id) {

            AddPlayerService.GetPlayerById(Id).then(function (result) {
                if (result.status === 200) {
                    if (result.data.isSuccess) {
                        $scope.PlayerDetails = result.data.Data;

                    }
                    else {
                        $scope.Message = result.data.Message;
                        alert($scope.Message);
                    }
                }
            });

        };

        $scope.DeletePlayerById = function (Id) {

            AddPlayerService.DeletePlayerById(Id).then(function (result) {
                if (result.status === 200) {
                    if (result.data.isSuccess) {
                        $scope.PlayerDetails = result.data.Data;

                    }
                    else {
                        $scope.Message = result.data.Message;
                        alert($scope.Message);
                    }
                }
            });

        };


        $scope.AllPlayers = function () {
            AddPlayerService.AllPlayers().then(function (result) {
                if (result.data.isSuccess) {
                    $scope.AllPlayers = result.data.Data;

                } else {
                    $scope.serverErrorMsgs = result.data.Message;
                    alert($scope.serverErrorMsgs);
                }

            });
        };

        $scope.AllPlayers();


        $scope.page = 1;

        $scope.pageChanged = function () {
            var startPos = ($scope.page - 1) * 10;
            //$scope.displayItems = $scope.totalItems.slice(startPos, startPos + 3);
            console.log($scope.page);
        };




    }]);

FootballApp.constant("dotnetapi", "http://localhost:65100/api/");
FootballApp.constant("dotnetfilepath", "http://localhost:65100/");