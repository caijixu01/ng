(function() {
    'use strict';
    var depNames = [ '$http', '$scope', '$state', '$stateParams', '$filter',
            '$interval', 'EchartsUtil' ];
    
    app.controller('ctrl1', ModuleUtil.defineController(
            depNames, baseChartModule, function(_super, _deps) {
        return {
            code : "qgwlk",
            url : "11.json",
//            url : BASE_URL + "purchase/model",
//            chartType : _deps.EchartsUtil.chartTypes.bar,
//            chartCfg : {
//                axisExchange : true, // x y 轴转置
//            },
            
            /**
             * 响应数据 格式2
             */
            responseDataType : 2,
            
            isUseChartComponent : true,
            
            modernBrowsers : [ {
                name : 'Opera',
                ticked : false
            }, {
                name : 'Internet Explorer',
                ticked : false
            } ],

            outputBrowsers : [],
            
            /**
             * 图表组件配置
             */
            chartOption : {
                title : "hahah",

                chart : {
                    onClick : function(param) {
                        console.log(param);
                    },
                },

                summary : [ {
                    display : "总量",
                    name : "total",
                    onClick : function() {
                        console.log(this.name);
                    }
                }, {
                    display : "最大",
                    name : "max",
                    onClick : function() {
                        console.log(this.name);
                    }
                }, ],
            },
            
//            model : {
//                dateType : "24"
//            },

            /**
             * 图表接口 - 返回数据 - 字段名 
             */
            responseDataFieldNames : $.extend({}, _super.responseDataFieldNames, {
//                name : "name",
//                data : "data",
                dataName : "code",
                dataFullName : "model",
//                dataValue : "num",
            }),
            
            /**
             * 数据映射
             */
            dataMapping : function(data) {
//                // data.name = "车辆数";
//                $.each(data.data, function(j, m){
//                    m.name += "期";
//                });
                this.url = (this.url == "11.json" ? "12.json" : "11.json");
                return data;
            },
            
            /**
             * 获取参数 4 加载页面
             */
            getReqParams : function() {
//                var params = _super.getReqParams.apply(this, arguments);
                return {
                    // ptype : this.model.appointTimeType,
                };
            },

            /**
             * 解析图表单击事件的param成列表页参数
             */
            parseListParamByChartParam : function(param) {
                return {
                };
            },

            /**
             * 跳转到列表页-的参数
             */
            getListParam : function() {
                return {};
            },
        };
    }));
})();
