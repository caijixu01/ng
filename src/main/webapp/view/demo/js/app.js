(function() {
    'use strict';
    var myModule = angular.module("HelloAngular", []);
    myModule.controller("helloAngular", [ "$scope", function($scope) {
        $scope.greeting = {
            text : "hello",
        };
    } ]);
})();
