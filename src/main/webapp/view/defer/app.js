(function() {
    'use strict';
    var app = angular.module("app", [ 'ui.router' ]);

    app.controller("ctrl1", [ '$scope', '$http', function($scope, $http) {
        var p1 = $http({
            params : {},
            url : "json.json",
            method : "get"
        });
        
        var p2 = $.ajax({
            params : {},
            url : "json.json",
            method : "get"
        })
        debugger
        $.when(
                p2
                
//        .then(function(response) {
//            console.log(response);
//        })

        ).then(function(ajaxArgs) {
            console.log(ajaxArgs);
            console.log(333);
        });
    } ]);

})();
