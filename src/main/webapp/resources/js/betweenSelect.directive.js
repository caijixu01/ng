(function() {
    'use strict';

    var app_module = angular.module('app');

    app_module.directive("betweenSelect", ['$http', '$timeout', '$q', function($http, $timeout, $q) {
        return { 
            restrict : "E",
            scope : {
                options : "=",
                from : "=",
                to : "=",
//                change : "&",
            },
            replace : true,
            template : '<select ng-model="_thisModel" >' + 
                       '   <option value="" selected>sel</option>' +
                       '   <option ng-repeat="option in options" value="{{option}}">{{option.name}}</option>' +
                       '</select>',
            
            link : function($scope, element, attrs, ngModel) {
//                var c = element.change;
//                console.log(c);
                debugger
                element.unbind("change");
//                var watch = $scope.$watch('_thisModel',function(newValue,oldValue, scope) {
//                    var v = newValue ? JSON.parse(newValue) : {};
//                    console.log(v);
//                    $scope.from = v.from;
//                    $scope.to= v.to;
//                    alert("000");
////                    c.apply(element);
//                });
                
                element.on("change", function() {
                    alert("fff");
//                    console.log($scope);
                    $scope.$parent.aaa();
//                    element.change();
//                    c.apply(element, arguments);
                });
//                element.bind("change", c);
            }
        };
    }]);
})();
