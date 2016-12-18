(function() {
    'use strict';
    var app = angular.module("app", ['ui.router']);

//    app.config(function($stateProvider, $urlRouterProvider) {
//        $urlRouterProvider.otherwise('/index');
//        $stateProvider
//            .state('index', {
//                url: '/index',
//                views: {
//                    '': {
//                        templateUrl: 'tpls/home.html'
//                    },
//                    'main@index': {
//                        templateUrl: 'tpls/loginForm.html'
//                    }
//                }
//            })
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
//    });
    
    var baseModule = {
        code : undefined,
        myclick : function() {
            alert(this.code);
        }
    };
    
    var arr = [ "$injector", "$scope", "$sce", "$filter", "$state" ];

    function getIndexByValue(array, value) {
        for ( var i in array) {
            if (array[i] === value) {
                return i;
            }
        }

        return undefined;
    }

    app.controller("ctrl1", arr.concat(function() {
        var $scope = arguments[getIndexByValue(arr, "$scope")];
        var $sce = arguments[getIndexByValue(arr, "$sce")];
        var $state = arguments[getIndexByValue(arr, "$state")];
        
        var module = $.extend({}, baseModule, {
            code : "test1",
            myclick : function() {
                baseModule.myclick.apply(this, arguments);
                alert(23232);
//                $state.go("index.html");
//                window.location = "index.html";
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
