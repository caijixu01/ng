(function() {
    'use strict';
    var myModule = angular.module("alert", []);
    myModule.controller("AlertDemoCtrl", [ "$scope", function($scope) {
        $scope.alerts = [
                         { type: 'danger', msg: 'Oh snap! Change a few things up and try submitting again.' },
                         { type: 'success', msg: 'Well done! You successfully read this important alert message.' }
                       ];

                       $scope.addAlert = function() {
                         $scope.alerts.push({msg: "Another alert!"});
                       };

                       $scope.closeAlert = function(index) {
                         $scope.alerts.splice(index, 1);
                       };

    } ])
//    .directive('alert', function () {
//        return {
//            restrict:'EA',
//            controller:'AlertController',
//            templateUrl:'view/template/alert/alert.html',
//            transclude:true,
//            replace:true,
//            scope: {
//              type: '@',
//              close: '&'
//            }
//          };
//        });
    .directive('myCustomer', function() {
        var option = {
                restrict: "AECM",
                template: "<h3>Hello, Directive, <span ng-transclude></span></h3>",
                replace: true,
                transclude: true
            };
            return option;
      });
})();

