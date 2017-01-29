(function() {
    'use strict';
    var app = angular.module("app", ['ui.router']);

    app.controller("ctrl1", ['$scope', function($scope) {
        $scope.cjx = 888;
        $scope.aaa = function() {
//            console.log(234);
            alert(this.cjx);
        };
        $scope.opts = [{name:"a1", from : 1, to : 2},
                       {name:"a2", from : 11, to : 22}
                       ];
//        debugger
//        $("#id88").bind("click", function() {
//            alert(324);
//        });
//        var dom = angular.element("#id88");
//        dom.bind("click", function() {
//              alert("0000");
////              bindfn.apply(dom, arguments);
//          });
//        var bindfn = dom.click;
//        dom.bind("click", function() {
//            alert("1111");
//              bindfn.apply(dom, arguments);
//              
//              alert("444");
//        });
//        console.log(bindfn);
        
//        var $dom = $("#id88");
//        $dom.bind("click", function(){
//           alert("cjx"); 
//        });
//        var bindfn = $dom.click;
//        $dom.bind("click", function() {
//            alert("0000");
//            bindfn.apply($dom, arguments);
//        });
    }]);

})();
