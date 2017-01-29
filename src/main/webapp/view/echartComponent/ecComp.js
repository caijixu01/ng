(function() {
    'use strict';
    var myModule = angular.module("ec-comp", [])
    .directive('ec1', function() {
        
        var option = {                
              scope: true,
//                restrict: "AE",
              templateUrl: "tpl1.html",
              transclude: true,
              controller : ['$scope', '$element', '$attrs', '$transclude', function($scope, $element, $attrs, $transclude) {
                  $scope.options = $.extend({
                          title : "",
                          data : "model",
                          chart : {
                              onClick : function(e) {},
                          },
                          summary : undefined,
                  }, $scope.$eval($attrs.ec1));
                  
                  var dom = $element.find("[chart]");
                  
                  $scope.$parent.$watch($scope.options.data, function (newValue, oldValue, scope) {
                      console.log("watch");
                      $scope.data = newValue;
                      
                      var option = {
                              tooltip : {
                                  trigger : 'axis'
                              },
                              legend : {
                                  data : [ 'ffff' ]
                              },
                              xAxis : [ {
                                  data : [1,2,3]
                              } ],
                              yAxis : [ {
                                  name : '°C'
                              } ],
                              series : [ {
                                  name : 'ff',
                                  type : 'line',
                                  data : [1,2,3]
                              } ]
                          };

                          var myChart = echarts.init(dom[0]);
                          myChart.setOption(option);
                          myChart.on("click", function(params) {
                              $scope.options.chart.onClick(params);
                          });
                  });
                  
                  $transclude($scope, function(clone) {
                      $element.find("[component]").append(clone);
                  });
              }],            
              replace: true,
//              link : function($scope, element, attrs, ngModel) {
//                  $scope.test2 = "fdfdf77777";
////                  console.log($scope.test);
//              },
//                compile: function() {
//                    return {
////                        pre: function($scope, iElement, iAttrs) {
////                            var $element = $(iElement);
////                            $scope.options = $scope.$eval(iAttrs.ec1);
////                            $scope.options.title1 = "fdsfdsf";
////                        }
//                    };
//                }
            };
            return option;
      });
})();

