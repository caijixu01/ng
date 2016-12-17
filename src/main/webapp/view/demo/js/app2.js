(function() {
    'use strict';
    var app = angular.module("app", []);

    var arr = [ "$scope", "$injector", "$sce", "$filter" ];

    function getIndexByValue(array, value) {
        for ( var i in array) {
            if (array[i] === value) {
                return i;
            }
        }

        return undefined;
    }
    
    var baseModule = {
        code : undefined,
        myclick : function() {
            alert(this.code);
        }
    };

    app.controller("ctrl1", arr.concat(function() {
        var $scope = arguments[getIndexByValue(arr, "$scope")];
        var $sce = arguments[getIndexByValue(arr, "$sce")];

        var module = $.extend({}, baseModule, {
            code : "test1",
            myclick : function() {
                baseModule.myclick.apply(this, arguments);
                alert(23232);
            }
        });

        $.extend($scope, module);

        $scope.myText = $sce.trustAsHtml("cjx");
    }));

    app.controller("ctrl2", arr.concat(function() {
        var $scope = arguments[getIndexByValue(arr, "$scope")];
        var $filter = arguments[getIndexByValue(arr, "$filter")];

        var module = $.extend({}, baseModule, {
            code : "test2",
        });

        $.extend($scope, module);
    }));
})();
