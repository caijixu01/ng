(function() {
    'use strict';

    angular.module('wuxingApp').factory('EchartsUtil', function() {
        function _toArrayData(chartData) {
            var dateArr = $.map(chartData, function(data) {
                return data.data;
            });
            return dateArr;
        }
        function getMaxNumber(numbers) {
          return Math.max.apply(Math, numbers);
        }
        function getMinNumber(numbers) {
            return Math.min.apply(Math, numbers);
        }
        function _getFirstAndLast(arr) {
            arr = arr || [];
            return {
                first : arr[0],
                last : arr[arr.length - 1]
            };
        }
        
        var _chartTypes = {
            line : "line",
            bar : "bar",
            pie : "pie",
            map : "map",
        };
        
        var _chartSubTypes = {
            ring : "ring",
            dubboY : "dubboY",
        };

        var _themeTypes = {
            blue : "blue",
        };

        return {
            chartTypes : _chartTypes,
            chartSubTypes : _chartSubTypes,
            themeTypes : _themeTypes,
            
            /**
             * get chartData MaxMinData
             */
            getMaxMinData : function(chartData) {
                var allData = $.map(chartData.series, function(data) {
                    return data.data;
                });
                var maxData = Math.max.apply(null, allData);
                var minData = Math.min.apply(null, allData);
                return {
                    max : maxData,
                    min : minData
                };
            },
            
            /**
             * 获取默认图表option
             */
            getOption : function(chartType, chartData, cfg) {
                cfg = cfg || {};
                // cfg.chartSubType // 图表子类型
                // cfg.onlyShowFirstLastXAxis // x轴只显示头尾
                // cfg.axisExchange// xy轴转换
                // cfg.dataUnit // 数据单位(元/%/辆)
                // cfg.showLegendData //在legend上显示数据

//                var allData = $.map(chartData.series, function(data) {
//                    return data.data
//                });
//                var maxData = Math.max.apply(null, allData);
//                var minData = Math.min.apply(null, allData);
//                console.log(allData);
//                console.log(maxData);
//                console.log(minData);
                
                var that = this;
                
                
                var opt = {};
                if (chartType === this.chartTypes.line) {
                    if (chartData.series.length === 0) {
                        chartData.series.push({});
                    }
                    opt = {
//                        title : {
//                            text: '',
//                            subtext: ''
//                        },
                        tooltip : {
                            trigger: 'axis'
                        },
                        legend: {
                            data: chartData.legend.name
                        },
                        xAxis : [
                            {
                                type : 'category',
                                boundaryGap : false,
                                data : chartData.xAxis.data,
                                axisLine : { // 坐标轴线
                                    show : true,
                                    lineStyle : { // 属性lineStyle控制线条样式
                                        color : '#aaa',
                                        width : 1
                                    }
                                },
                                axisLabel : {
                                    interval : (function() {
                                        if (cfg.onlyShowFirstLastXAxis) {
                                            var len = chartData.xAxis.data.length;
                                            if (len > 2) {
                                                return len - 2;
                                            }
                                        }
                                        return "auto";
                                    })(),
                                },
                            }
                        ],
                        yAxis : [
                            {
                                name : "",
//                                max : maxData,
//                                min : minData,
                                type : 'value',
                                axisLabel : {
//                                    formatter: '{value} °C'
                                },
                            }
                        ],
                        series : $.map(chartData.series, function(data) {
                            return {
//                                symbol:'none', // 不显示线上的点
                                name : data.name,
                                type : _chartTypes.line,
                                data : data.data,
                                yAxisIndex : data.yAxisIndex,
                                itemStyle: {normal: {areaStyle: {type: 'default'}}},
//                                markPoint : {
//                                    data : [ {
//                                        type : 'max',
//                                        name : '最大值'
//                                    }, {
//                                        type : 'min',
//                                        name : '最小值'
//                                    } ]
//                                },
                            };
                        })
                    };

                } else if (chartType === this.chartTypes.bar) {
                    if (chartData.series.length === 0) {
                        chartData.series.push({});
                    }
                    opt = {
                     /* title : {
                            text: '某地区蒸发量和降水量',
                           subtext: '纯属虚构'
                      },*/
                        tooltip : {
                            trigger: 'axis',
                            axisPointer: {
                                type: 'item'
                            },
                        },
                        legend: {
                            data: chartData.legend.name
                        },
                        xAxis : [
                            {
                                type : 'category',
                                data : chartData.xAxis.data,
                                axisLine : { // 坐标轴线
                                    show : true,
                                    lineStyle : { // 属性lineStyle控制线条样式
                                        color : '#aaa',
                                        width : 1
                                    }
                                },
                            }
                        ],
                        yAxis : [
                            {
//                                max : maxData,
//                                min : minData,
                                type : 'value'
                            }
                        ],
                        series : $.map(chartData.series, function(data) {
                            return {
                                name : data.name,
                                type : _chartTypes.bar,
                                data : data.data,
                                yAxisIndex : data.yAxisIndex,
//                                markPoint : {
//                                    data : [ {
//                                        type : 'max',
//                                        name : '最大值'
//                                    }, {
//                                        type : 'min',
//                                        name : '最小值'
//                                    } ]
//                                },
                            };
                        })
                    };
                    
                    if (cfg.axisExchange) {
                        var temp = opt.xAxis;
                        opt.xAxis = opt.yAxis;
                        opt.yAxis = temp;
                    }
                    
                } else if (chartType === this.chartTypes.pie) {
                    if (chartData.series.length === 0) {
                        chartData.series.push({});
                    }

                    opt = {
                        title : {
//                            text: '某站点用户访问来源',
//                            subtext: '纯属虚构',
                            x:'center'
                        },
                        tooltip : {
                            trigger: 'item',
//                            formatter: "{a} <br/>{b} : {c} ({d}%)"
                        },
                        color:["#63afe1","#ffe32a","#fa9c28","#a9d671","#0c8af5"],
                        legend: {
                            orient : 'vertical',
                            x : 'left',
                            data:chartData.legend.data,
                            formatter: function(name) {
                                // cfg.dataUnit // 数据单位(元/%/辆)
                                // cfg.showLegendData //在legend上显示数据
                                if (cfg.showLegendData) {
                                    var value = ArrayUtil.getByField(chartData.series[0].data, "name", name)["value"];
                                    if (value != undefined) {
                                        name = name + " " + value;
                                        if (cfg.dataUnit != undefined) {
                                            name = name + cfg.dataUnit;
                                        }
                                    }
                                    return name;
                                } else {
                                    return name;
                                }
                            }
                        },
                        series : [
                            {
                                name:chartData.series[0].name,
                                type:_chartTypes.pie,
                                radius : (function(){
                                    var var1 = '80%';
                                    if (cfg.chartSubType === that.chartSubTypes.ring) {
                                        return [var1, '60%'];
                                    }
                                    return var1;
                                })(),
                                center: ['65%', '50%'],
                                itemStyle : {
                                    normal : {
                                        label : {
                                            show : false
                                        },
                                        labelLine : {
                                            show : false
                                        }
                                    },
                                },
                                data:chartData.series[0].data
                            }
                        ]
                    };
                } else if (chartType === this.chartTypes.map) {
                    if (chartData.series.length === 0) {
                        chartData.series.push({});
                    }
                    
                    var allData = $.map(chartData.series, function(data) {
                        return $.map(data.data, function(data2) {
                            return data2.value;
                        });
                    });
                    var maxData = Math.max.apply(null, allData);
                    var minData = Math.min.apply(null, allData);
                    
                    opt = {
                        tooltip : {
                            trigger: 'item'
                        },
                        dataRange: {
                            show: false,
                            min: minData,
                            max: maxData,
                            color:['#65AFEC','#205c9a'],
                        },
                        series : $.map(chartData.series, function(data) {
                            return {
                                name : data.name,
                                type : _chartTypes.map,
                                mapType: 'china',  
                                roam: false,
                                itemStyle:{
                                    normal:{
                                        label:{show:false},
                                        areaStyle: {
                                            color: 'rgba(15,34,72,0)'
                                        }
                                    },
                                    emphasis:{label:{show:false},areaStyle: {
                                        color: '#00d6d3'
                                    }},
                                },
                                data : data.data,
//                                [
//                                  {name: '北京',value: Math.round(Math.random()*1000)},
//                                  {name: '天津',value: Math.round(Math.random()*1000)},
//                              ]
                            };
                        })
                    };
                }
                
//                $.extend(true, opt, {
//                    grid : {
//                        x : 50,
//                        y : 50,
//                        x2 : 30,
//                        y2 : 50,
//                    }, 
//                });
                
                return opt;
            },

            getTheme : function(themeType) {
                var _backgroundColor = "rgba(0,3,3,0)";
                return {
                    // 全图默认背景
                    backgroundColor: _backgroundColor,
                    noDataLoadingOption :{
                        text: '暂无数据',
                        effect:'bubble',
                        effectOption : {
                            backgroundColor:_backgroundColor,
                            effect: {
                                n: 0 //气泡个数为0 
                            }
                        },
                        textStyle: {
                            fontSize: 32,
                            fontWeight: 'bold'
                        }
                    },
                    // 默认色板
                    color: [
                        '#0bd2fd',
                        '#09ab9e',
                        '#b319e4',
                        '#4bf02a',
                        '#ffe42a',
                        '#fa9c28',
                        '#6c10de',
                        '#0c8bf5',
                        '#062f7f',
                        '#1193af',
//                        '#FE8463','#9BCA63','#FAD860','#60C0DD','#0084C6',
                        '#D7504B','#C6E579','#26C0C0','#F0805A','#F4E001',
                        '#B5C334'
                    ],
                    

                    
                    
                    // 图表标题
                    title: {
                        textStyle: {
                            fontWeight: 'normal',
                            color: '#fff'          // 主标题文字颜色
                        }
                    },

                    // 图例
                    legend: {
                        textStyle: {
                            color: '#ccc'          // 图例文字颜色
                        }
                    },

                    // 值域
//                    dataRange: {
//                        itemWidth: 15,
//                        color: ['#FFF808','#21BCF9'],
//                        textStyle: {
//                            color: '#ccc'          // 值域文字颜色
//                        }
//                    },

                    toolbox: {
                        color : ['#fff', '#fff', '#fff', '#fff'],
                        effectiveColor : '#FE8463',
                        disableColor: '#666'
                    },

                    // 提示框
                    tooltip: {
                        backgroundColor: 'rgba(250,250,250,0.8)',     // 提示背景颜色，默认为透明度为0.7的黑色
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'line',         // 默认为直线，可选为：'line' | 'shadow'
                            lineStyle : {          // 直线指示器样式设置
                                color: '#aaa'
                            },
                            crossStyle: {
                                color: '#aaa'
                            },
                            shadowStyle : {                     // 阴影指示器样式设置
                                color: 'rgba(200,200,200,0.2)'
                            }
                        },
                        textStyle: {
                            color: '#333'
                        }
                    },

                    // 区域缩放控制器
                    dataZoom: {
                        dataBackgroundColor: '#555',            // 数据背景颜色
                        fillerColor: 'rgba(200,200,200,0.2)',   // 填充颜色
                        handleColor: '#eee'     // 手柄颜色
                    },

                    // 网格
                    grid: {
                        borderWidth: 0
                    },

                    // 类目轴
                    categoryAxis: {
                        axisLine: {            // 坐标轴线
                            show: false
                        },
                        axisTick: {            // 坐标轴小标记
                            show: false
                        },
                        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                color: '#ccc'
                            }
                        },
                        splitLine: {           // 分隔线
                            show: false
                        }
                    },
                    // 数值型坐标轴默认参数
                    valueAxis: {
                        axisLine: {            // 坐标轴线
                            show: false
                        },
                        axisTick: {            // 坐标轴小标记
                            show: false
                        },
                        axisLabel: {           // 坐标轴文本标签，详见axis.axisLabel
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                color: '#ccc'
                            }
                        },
                        splitLine: {           // 分隔线
                            show : false,
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                color: ['#aaa'],
                                type: 'dashed'
                            }
                        },
                        splitArea: {           // 分隔区域
                            show: false
                        },
                        axisLine : { // 坐标轴线
                            show : true,
                            lineStyle : { // 属性lineStyle控制线条样式
                                color : '#aaa',
                                width : 1
                            }
                        },
                    },

                    polar : {
                        name : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                color: '#ccc'
                            }
                        },
                        axisLine: {            // 坐标轴线
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: '#ddd'
                            }
                        },
                        splitArea : {
                            show : true,
                            areaStyle : {
                                color: ['rgba(250,250,250,0.2)','rgba(200,200,200,0.2)']
                            }
                        },
                        splitLine : {
                            lineStyle : {
                                color : '#ddd'
                            }
                        }
                    },

                    timeline : {
                        label: {
                            textStyle:{
                                color: '#ccc'
                            }
                        },
                        lineStyle : {
                            color : '#aaa'
                        },
                        controlStyle : {
                            normal : { color : '#fff'},
                            emphasis : { color : '#FE8463'}
                        },
                        symbolSize : 3
                    },

                    // 折线图默认参数
                    line: {
                        smooth : true
                    },

                    // K线图默认参数
                    k: {
                        itemStyle: {
                            normal: {
                                color: '#FE8463',       // 阳线填充颜色
                                color0: '#9BCA63',      // 阴线填充颜色
                                lineStyle: {
                                    width: 1,
                                    color: '#FE8463',   // 阳线边框颜色
                                    color0: '#9BCA63'   // 阴线边框颜色
                                }
                            }
                        }
                    },

                    // 雷达图默认参数
                    radar : {
                        symbol: 'emptyCircle',    // 图形类型
                        symbolSize:3
                        //symbol: null,         // 拐点图形类型
                        //symbolRotate : null,  // 图形旋转控制
                    },

                    pie: {
                        itemStyle: {
                            normal: {
                                borderWidth: 1,
                                borderColor : 'rgba(255, 255, 255, 0.5)'
                            },
                            emphasis: {
                                borderWidth: 1,
                                borderColor : 'rgba(255, 255, 255, 1)'
                            }
                        }
                    },

                    map: {
                        itemStyle: {
                            normal: {
                                borderColor:'rgba(255, 255, 255, 0.5)',
                                areaStyle: {
                                    color: '#ddd'
                                },
                                label: {
                                    textStyle: {
                                        // color: '#ccc'
                                    }
                                }
                            },
                            emphasis: {                 // 也是选中样式
                                areaStyle: {
                                    color: '#FE8463'
                                },
                                label: {
                                    textStyle: {
                                        // color: 'ccc'
                                    }
                                }
                            }
                        }
                    },

                    force : {
                        itemStyle: {
                            normal: {
                                linkStyle : {
                                    color : '#fff'
                                }
                            }
                        }
                    },

                    chord : {
                        itemStyle : {
                            normal : {
                                borderWidth: 1,
                                borderColor: 'rgba(228, 228, 228, 0.2)',
                                chordStyle : {
                                    lineStyle : {
                                        color : 'rgba(228, 228, 228, 0.2)'
                                    }
                                }
                            },
                            emphasis : {
                                borderWidth: 1,
                                borderColor: 'rgba(228, 228, 228, 0.9)',
                                chordStyle : {
                                    lineStyle : {
                                        color : 'rgba(228, 228, 228, 0.9)'
                                    }
                                }
                            }
                        }
                    },

                    gauge : {
                        axisLine: {            // 坐标轴线
                            show: true,        // 默认显示，属性show控制显示与否
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: [[0.2, '#9BCA63'],[0.8, '#60C0DD'],[1, '#D7504B']],
                                width: 3,
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisTick: {            // 坐标轴小标记
                            length :15,        // 属性length控制线长
                            lineStyle: {       // 属性lineStyle控制线条样式
                                color: 'auto',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        axisLabel: {            // 坐标轴小标记
                            textStyle: {       // 属性lineStyle控制线条样式
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        splitLine: {           // 分隔线
                            length :25,         // 属性length控制线长
                            lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                width:3,
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        pointer: {           // 分隔线
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5
                        },
                        title : {
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                fontSize: 20,
                                fontStyle: 'italic',
                                color: '#fff',
                                shadowColor : '#fff', //默认透明
                                shadowBlur: 10
                            }
                        },
                        detail : {
                            shadowColor : '#fff', //默认透明
                            shadowBlur: 5,
                            offsetCenter: [0, '50%'],       // x, y，单位px
                            textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                fontWeight: 'bolder',
                                color: '#fff'
                            }
                        }
                    },

                    funnel : {
                        itemStyle: {
                            normal: {
                                borderColor : 'rgba(255, 255, 255, 0.5)',
                                borderWidth: 1
                            },
                            emphasis: {
                                borderColor : 'rgba(255, 255, 255, 1)',
                                borderWidth: 1
                            }
                        }
                    },

                    textStyle: {
                        fontFamily: '微软雅黑, Arial, Verdana, sans-serif'
                    }
                };
            },

        };
    });
})();




 



 


