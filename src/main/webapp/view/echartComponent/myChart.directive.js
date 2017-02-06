/**
 * 图表组件
 * 
 * demo : <div my-chart-line1="myOption"/>
 * 
 * 组件配置说明:
 * {
            // 组件 标题名称
            title : "标题名称", 
            
            // 组件 父数据model的名字
            data : "model", 
            
            // 组件 图表配置
            chart : {
                // 单击事件
                onClick : function(e) {
                    console.log("ieieieieieiei");
                },
            },
            
            // 组件 概览配置
            summary : [
                {
                    // 显示名
                    display : "总量",
                    // 在父数据model中的字段名
                    name : "total",
                    // 单击事件
                    onClick : function() {
                        console.log(this.name);
                    }
                },
                {
                    display : "最大",
                    name : "max",
                },
            ],
        }
 */
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
    
    var _directiveOption = {
        scope : true,
//        restrict: "AE",
//        templateUrl : "tpl1.html",
        replace : true,
        transclude : true,
//        controller : ModuleUtil.defineController([ '$scope', '$element',
//            '$attrs', '$transclude', 'EchartsUtil' ], baseMyChart,
//            function(_super, _deps) {
//            return {
//                
//            };
//        }),
    };
    
    var _depNames = ['$scope', '$element', '$attrs', '$transclude', 'EchartsUtil'];
    
    var myModule = angular.module("my-chart", []).directive('myChartLine1', function() {
        var option = $.extend({}, _directiveOption, {
            templateUrl : "myChartLine1.html",
            controller : ModuleUtil.defineController(_depNames, 
                    baseMyChart, function(_super, _deps) {
                return {
                    
                };
            }),
        });
    
        return option;
    });
})();