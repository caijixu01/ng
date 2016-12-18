(function() {
    'use strict';
    var app = angular.module("app", ['ui.router']);

    app.config(function($stateProvider, $urlRouterProvider) {
        $urlRouterProvider.otherwise('/t1');
        $stateProvider.state('s_t1', {
                url: '/t1',
                views: {
                    '': {
                        templateUrl: 'tpls/t1.html'
                    },
//                    'main@index': {
//                        templateUrl: 'tpls/loginForm.html'
//                    }
                }
            });
       
        $stateProvider.state('s_t2', {
            url: '/t2',
            views: {
                '': {
                    templateUrl: 'tpls/t2.html'
                },
//                'main@index': {
//                    templateUrl: 'tpls/loginForm.html'
//                }
            }
        });
        
//            .state('booklist', {
//                url: '/{bookType:[0-9]{1,4}}',
//                views: { //注意这里的写法，当一个页面上带有多个ui-view的时候如何进行命名和视图模板的加载动作
//                    '': {
//                        templateUrl: 'tpls/bookList.html'
//                    },
//                    'booktype@booklist': {
//                        templateUrl: 'tpls/bookType.html'
//                    },
//                    'bookgrid@booklist': {
//                        templateUrl: 'tpls/bookGrid.html'
//                    }
//                }
//            })
//            .state('addbook', {
//                url: '/addbook',
//                templateUrl: 'tpls/addBookForm.html'
//            })
//            .state('bookdetail', {
//                url: '/bookdetail/:bookId', //注意这里在路由中传参数的方式
//                templateUrl: 'tpls/bookDetail.html'
//            })
    });
    var depNames = [ "$injector", "$scope", "$sce", "$filter", "$state" ];

    var baseModule = {
        deps : undefined,
        code : undefined,
        myclick : function() {
            alert(this.code);
        },
        changePage : function() {
//            alert(this.code);
            this.deps.$state.go("s_t" + this.code);
        },
        init : function() {
            
        }
    };
    
    /**
     * 返回一个function
     */
    function defineController(depNames, parent, childFn) {
        function getDeps(depNames, depValues) {
            var c = {};
            for ( var i in depNames) {
                c[depNames[i]] = depValues[i];
            }
            return c;
        }
        
        function fn() {
            if (inArray(depNames, "$scope") == -1) {
                depNames.push("$scope");
            }
            var deps = getDeps(depNames, arguments);
            var child = $.extend({}, parent, childFn(parent, deps), {
                deps : deps,
            });
            $.extend(deps.$scope, child);
            child.init();
        }
        
        fn.$inject = depNames;

        return fn;
    }
    
    app.controller("ctrl1", defineController(depNames, baseModule, function(_super, _deps) {
        var $scope = _deps.$scope;
        var $sce = _deps.$sce;
        
        var that = {
            code : "1",
            
            init : function() {
//                var sc = this.deps.$scope;
//                console.log(sc === $scope); // true
                $scope.myText = $sce.trustAsHtml("cjx222");
            }
        };
        
//        $scope.myText = $sce.trustAsHtml("cjx222");
        return that;
    }));

    app.controller("ctrl2", defineController(depNames, baseModule, function(_super, _deps) {
        
        var that = {
            code : "2",
        };
        
        return that;
    }));
    
    function inArray(arr, val) {
        for (var i in arr) {
            if (arr[i] === val) {
                return i;
            }
        }
        return -1;
    }
})();
