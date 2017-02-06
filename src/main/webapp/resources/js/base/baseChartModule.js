/**
 * 图表模块 基类
 */
var baseChartModule = MyUtil.defineModule(baseModule, function(_super) {
    /**
     * 生成数组 by size
     * @param size
     * @returns
     */
    function _genJsonArrBySize(size) {
        size = size || 0;
        
        var arr = [];
        for (var i = 0; i < size; i++) {
            arr.push({});
        }
        return arr;
    }
    
    return {
        url : undefined,
        loadOnInit : true,
        listPageStateName : undefined,
        
        /**
         * 响应数据 格式2
         * 2 : 格式2 (带总量的多组数据)
         * 其它 : 早期定的格式
         */
        responseDataType : undefined,
        
        /**
         * 是否有单击事件
         */
        hasClickEvent : true,
        
        /**
         * 页面上的图表dom
         */
        chartDom : undefined,
        
        // 图表 自定义配置
        chartCfg : {
            chartSubType : undefined,
            onlyShowFirstLastXAxis : false, //只显示xAxis轴的头尾
        },
        
        /**
         * 图表类型
         */
        chartType : "line",
        
        /**
         * 图表接口 - 返回数据 - 字段名 
         */
        responseDataFieldNames : {
            name : "name",
            data : "data",
            dataName : "name",
//            dataFullName : "name", // 
            dataValue : "num",
        },
        
        getChartDomId : function() {
            var chartDomId = this.code;
            var pm = this.parentModule;
            while (pm) {
                if (pm.code) {
                    chartDomId = pm.code + "_" + chartDomId;
                }
                pm = pm.parentModule;
            }
            return chartDomId;
        },
        
        getChartDom : function() {
            if (this.chartDom) {
                return this.chartDom;
            } else {
                return document.getElementById(this.getChartDomId());
            }
        },
        
        /**
         * 将接口返回的数据处理成标准的chartData数据
         * chartData数据格式:
         * [
         *   {name : "", // 名称  福建
         *    dataGroup : 1, // 分组 (可空)
         *    data : [ // 数据array
         *              {
         *                  name : "", // 名  1
         *                  fullName : "", // 一月
         *                  value : "" // 值  10
         *              },
         *              {
         *                  name : "", // 名  2
         *                  fullName : "", // 二月
         *                  value : "" // 值  20
         *              }
         *              ...
         *           ]
         *    }
         *    ...
         *  ]
         * 处理 responseData
         */
        dealResponseData : function(response) {
            var that = this;
            var data = MyUtil.getValueByFieldNames(response, "data");
            
            if (this.responseDataType == 2 && data) {
                data = data["data"];
            }
            
            if (!data) {
                data = [];
            } else if (!$.isArray(data)) {
                data = [data];
            }
            
            var resultData = [];
            $.each(data, function(i, n){
                var _name = n[that.responseDataFieldNames.name];
                var _type = n["type"];
                var _datas = n[that.responseDataFieldNames.data];
                
                var tempData = {
                    "name" : _name,
                    "dataGroup" : _type == 2 ? 1 : undefined,
                    "data" : $.map(_datas, function(data) {
                        return {
                            "name" : data[that.responseDataFieldNames.dataName],
                            "fullName" : data[that.responseDataFieldNames.dataFullName],
                            "value" : data[that.responseDataFieldNames.dataValue],
                        };
                    })
                };
                
                var mappingData = that.dataMapping(tempData);
                
                resultData.push(mappingData);
            });
            
            return resultData;
        },
        
        /**
         * 数据映射
         */
        dataMapping : function(data) {
            return data;
        },
        
        getEchartsUtil : function() {
            return window.EchartsUtil || this.deps.EchartsUtil;
        },
        
        /**
         * getChartOption
         */
        getChartOption : function(data) {
            var that = this;
            
            var chartData;
            if (this.chartType === this.getEchartsUtil().chartTypes.map) {
                chartData = {
                    "legend" : {
                        name : MyUtil.getJsonArrayFieldValues(data, "name"),
                    },
//                            legend: {
//                                data:['iphone3','iphone4','iphone5']
//                            },
                    "series" : $.map(data, function(data) {
                        return {name : data["name"],
                            data : $.map(data["data"], function(data) {
                                return {value:data["value"], name:data["name"]};
                            })
                        };
                    })
//                            series : [
//                                {
//                                    name: 'iphone3',
//                                    data:[
//                                        {name: '北京',value: Math.round(Math.random()*1000)},
//                                        {name: '天津',value: Math.round(Math.random()*1000)},
//                                        ]
//                                }
//                            ]
                    
                };
            } else if (this.chartType === this.getEchartsUtil().chartTypes.pie) {
                data = [data[0] || {}]; // 饼图 === 一维数据
                
                chartData = {
                    "legend" : {
                        data : $.map(data, function(data) {
                            return  $.map(data["data"], function(data) {
                                return data["name"];
                            });
                        })
                    },
//                            legend: {
//                                data:['直接访问','邮件营销','联盟广告','视频广告','搜索引擎']
//                            },
                    "series" : [{name : data[0]["name"],
                            data : $.map(data, function(data) {
                                return  $.map(data["data"], function(data) {
                                    return {
                                        value:data["value"], 
                                        name:data["name"]};
                                });
                            })
                        }]
//                            series : [
//                                {
//                                    name:'访问来源',
//                                    data:[
//                                        {value:335, name:'直接访问'},
//                                        {value:310, name:'邮件营销'},
//                                    ]
//                                }
//                            ]
                    
                };
            } else {
                var dataGroups = MyUtil.getJsonArrayFieldValues(data, "dataGroup");
                var maxDataGroup = Math.max.apply(null, dataGroups);
                maxDataGroup = maxDataGroup || 0;
                var dataGroupCount = maxDataGroup + 1;
                
                chartData = {
                    //  data:['最高气温','最低气温']
                    "legend" : {
                        name : MyUtil.getJsonArrayFieldValues(data, "name"),
                    },
                    // data : ['周一','周二','周三','周四','周五','周六','周日']
                    "xAxis" : {
                        data : MyUtil.getJsonArrayFieldValues(MyUtil.getValueByFieldNames(data[0], "data"), "name"),
                    },
//                    "yAxis" : _genJsonArrBySize(dataGroupCount), // 生成size个数的数组
                    
                    "series" : $.map(data, function(data) {
                        return {name : data["name"],
                            yAxisIndex : data.dataGroup,
                            data : MyUtil.getJsonArrayFieldValues(data["data"], "value"),
                        };
                    })
//                            series : [
//                                {
//                                    name:'最高气温',
//                                    data:[11, 11, 15, 13, 12, 13, 10],
//                                }
//                            ]
                };
            }
            
            chartData["chartData"] = data;
            var option = this.getEchartsUtil().getOption(this.chartType, chartData, this.chartCfg);
            
            return option;
        },
        
//        getReqParams : function() {
//        },
        
//        /**
//         * 加载图表
//         */
//        load : function() {
//            var that = this;
//            var params = that.getReqParams();
//            console.log(params);
////            MyUtil.ajax_get(that.url, params, function(response) {
////                var json = response;
////                var myChart = that.load_callback(json);
////            });
//            
//            var $http = window.$http || this.deps.$http;
//            $http({
//                params : params,
//                url : that.url,
//                method : "GET"
//            }).then(function(response) {
//                var myChart = that.load_callback(response.data);
//            }); 
//        },
        
        /**
         * 加载图表-回调函数
         */
        load_callback : function(resp) {
            _super.load_callback.apply(this, arguments);
            
            var that = this;
            
            var response = this.dealResponseData(resp);
            if (this.isUseChartComponent) {
                var json = $.extend({}, resp.data, {
                    data : response
                });
                
                this.model.charData = json;
            } else {
                var chartOption = this.getChartOption(response);
                var dom = this.getChartDom();
                var myChart = echarts.init(dom, this.getEchartsUtil().getTheme(this.getEchartsUtil().themeTypes.blue));
                $("div:first", $(dom)).css("overflow","visible"); // 作用: tooltip 不被遮住
                myChart.setOption(chartOption);
                if (this.hasClickEvent) {
                    myChart.on("click", function(param) {
                        var listParam = that.parseListParamByChartParam(param);
                        that.turnToListPage(undefined, listParam);
                    });
                }
//            var that = this;
//            $(dom).click(function(e) {
//                that.load();
//            });
                return myChart;
            } 
        },
        
        /**
         * 解析图表单击事件的param成列表页参数
         */
        parseListParamByChartParam : function(param) {
            return {};
        },
        
        /**
         * 跳转到列表页-的参数
         */
        getListParam : function() {
            return {};
        },
        
        /**
         * 跳转到列表页
         * @param param 附加参数
         */
        turnToListPage : function(listStateName, param) {
            var listParam = this.getListParam();
            var searchParam = $.extend({}, param, listParam);
//            console.log(searchParam);
            
            var stateName;
            if (listStateName) {
                stateName = listStateName;
            } else if (this.listPageStateName) {
                stateName = this.listPageStateName;
            } else if (this.parentModule) {
                stateName = this.parentModule.listPageStateName;
            }
            
            var $state = window.$state || this.deps.$state;
            $state.go(stateName, {
                search : searchParam
            });
        },
        
        // *******************
//        /**
//         * 选择 履约时长类型
//         */
//        selectAppointTimeType : function(appointTimeType) {
//            this.model.appointTimeType = appointTimeType;
//            this.doInit(); // 加载页面
//        },
//        
//        /**
//         * 选择 设备级别
//         */
//        selectEquipmentLevel : function(equipmentLevel) {
//            this.model.equipmentLevel = equipmentLevel;
//            this.doInit(); // 加载页面
//        },
        
        /**
         * 刷新页面 by 选择了页面上的选项
         * @param modelFieldName 页面上的选项对应的modelFieldName
         * @param modelFieldValue 页面上的选项对应的modelFieldValue
         */
        loadPageBySelect : function(modelFieldName, modelFieldValue) {
            this.model[modelFieldName] = modelFieldValue;
            this.load(); // 加载页面
        },
    };
});