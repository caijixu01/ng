(function() {
    'use strict';
    var app = angular.module("app", ['ui.router', "isteven-multi-select", 'ec-comp']);

    app.controller("ctrl1", ['$scope', function($scope) {
        var vm = this;
        vm.modernBrowsers = [
                {
                    name : 'Opera',
                    ticked : false
                },
                {
                    name : 'Internet Explorer',
                    ticked : false
                } ];
        
        vm.outputBrowsers = [
        ];
        
        $scope.model = {
            total : 100,
            max : 201,
            resp : {
            }
        };
        
        $scope.opt = {
            title : "hahah",
            
            data : "model",
            
            chart : {
                type : "line",
                onClick : function(e) {
                    console.log("ieieieieieiei");
                },
            },
            
            summary : [
                {
                  display : "总量",
                  name : "total",
                  onClick : function() {
                      console.log(this.name);
                  }
                },
                {
                    display : "最大",
                    name : "max",
                },
            ],
        };
        
        this.cjx = 9989;
        
        $scope.load = function() {
            
            $scope.model = {
                total : 100 + Math.random() * 100,
                max : 201 + Math.random() * 100,
            }
        };
    }]);
})();