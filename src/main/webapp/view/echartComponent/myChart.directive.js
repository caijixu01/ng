(function() {
    'use strict';
    
    /**
     * My Chart 基类
     */
    var baseMyChart =  MyUtil.defineModule(baseChartModule, function(_super) { 
        return {
            chartType : "line",

            options : undefined,

            /**
             * mychart组件的配置项
             */
            getOptions : function() {
                if (this.options) {
                    return this.options;
                }
                
                this.options = $.extend({
                    title : "",
                    data : "model",
                    chart : {
                        onClick : function(e) {},
                    },
                    summary : undefined,
                }, this.deps.$scope.$eval(this.deps.$attrs.myChartLine1));
                
                return this.options;
            },

            init : function() {
                var that = this;

                var dom = this.deps.$element.find("[chart]");
                var myChart = echarts.init(dom[0]);
                myChart.on("click", function(params) {
                    that.deps.$scope.getOptions().chart.onClick(params);
                });
                
                this.deps.$scope.$parent.$watch(this.deps.$scope.getOptions().data, function(newValue, oldValue, scope) {
                    scope.data = newValue;
                    var option = that.getChartOption(newValue.data);
                    myChart.setOption(option);
                });

                this.deps.$transclude(this.deps.$scope, function(clone) {
                    that.deps.$element.find("[component]").append(clone);
                });
            },
        };
    });
    
    var myModule = angular.module("my-chart", []).directive('myChartLine1', function() {
        var option = {
            scope : true,
//            restrict: "AE",
            templateUrl : "tpl1.html",
            replace : true,
            transclude : true,
            controller : ModuleUtil.defineController(['$scope', '$element', '$attrs', '$transclude', 'EchartsUtil'], 
                    baseMyChart, function(_super, _deps) {
                return {
                };
            }),
        };
    
        return option;
    });
})();