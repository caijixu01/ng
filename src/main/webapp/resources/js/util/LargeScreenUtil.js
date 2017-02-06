/**
 * 大屏工具类
 */
var LargeScreenUtil = {    
    getDateTypes : function() {
        return {
            "day" : "daily",
            "week" : "weekly",
            "month" : "monthly"
        };
    },
    
    getDateTypes2 : function() {
        return {
            "day" : "1",
            "week" : "2",
            "month" : "3"
        };
    },
    
    /**
     * 履约时长类型, 12/24/36期
     */
    getAppointTimeTypes : function() {
        return {
            "type12" : "12",
            "type24" : "24",
            "type36" : "36"
        };
    },
    
    getFirstAndLast_xAxisName : function(chartData, dataName, nameName) {
        var xAxisNames = MyUtil.getJsonArrayFieldValues(MyUtil.getValueByFieldNames(chartData[0], dataName || "data"), nameName || "name");
        return {
            first : xAxisNames[0],
            last : xAxisNames[xAxisNames.length - 1]
        };
    },
    
    setClass : function(className, flagAttr) {
        var t = MyUtil.getEventTarget();
        if (t && (t.tagName === "INPUT" || t.tagName === "input")) {
            var $t = $(t); 
            $t.parent().find("["+flagAttr+"]").removeClass(className);
            $t.addClass(className);
        }
    },
    
    setDateTypeSelected : function() {
        this.setClass("on", "date-type");
    },
    
    /**
     * 数量类型 存量/增量/减量
     */
    getQuantityTypes : function() {
        return {
            "cl" : "3",
            "zl" : "1",
            "jl" : "2"
        };
    },
    
    /**
     * 违章数据类型 扣分/罚款
     */
    getViolationDataTypes : function() {
        return {
            "kf" : "kf",
            "fk" : "fk",
        };
    },
    
    /**
     * 设备 级别 ABCD级
     */
    getEquipmentLevels : function() {
        return {
            "A" : "A",
            "B" : "B",
            "C" : "C",
            "D" : "D",
        };
    },
    
    /**
     * 设备 
     */
    getEquipments : function() {
        return [ {
                name : "设备1",
                value : "1",
            },{
                name : "设备2",
                value : "2",
            },{
                name : "设备3",
                value : "3",
            }
        ];
    },
    
    toDate : function(date) {
        if (typeof date === "string" || typeof date === "number") {
            date = date + "";
            if (date.indexOf("-") != -1) {
                return DateUtil.strFormatToDate("yyyy-MM-dd", date);
            }
            
            if (date.length == 8) {
            } else if (date.length == 6) {
                date = date + "01";
            } else if (date.length == 4) {
                date = date + "0101";
            } else {
                return undefined;
            }
            return DateUtil.strFormatToDate("yyyyMMdd", date);
        }
        return date;
    },
    
    toDefaultDateStr : function(date) {
        var tempDate = this.toDate(date);
        var ret = DateUtil.dateToStr("yyyy-MM-dd", tempDate);
        return ret;
    },
    
    /**
     * get 默认开始时间
     */
    getDefaultBeginDate : function(dateType, date) {
        if (date) {
            return this.toDate(date);
        }
        date = new Date();
        var dt;
        if (dateType === this.getDateTypes().week) {
            dt = DateUtil.dateAdd("w", -12, date);
            dt = DateUtil.getWeekStartDate(dt);
        } else if (dateType === this.getDateTypes().month) {
            dt = DateUtil.dateAdd("m", -12, date);
            dt.setDate(1);
        } else {
            dt = DateUtil.dateAdd("m", -1, date); // 默认天
        }
        
        return dt;
    },
    
    /**
     * get 默认开始时间 str
     */
    getDefaultBeginDateStr : function(dateType, date) {
        return DateUtil.dateToStr_yyyyMMdd(this.getDefaultBeginDate(dateType, date));
    },

    /**
     * get 默认结束时间
     */
    getDefaultEndDate : function(dateType, date) {
        if (date) {
            return this.toDate(date);
        }
        date = new Date();
        var dt;
        if (dateType === this.getDateTypes().week) {
            dt = DateUtil.dateAdd("w", -1, date);
            dt = DateUtil.getWeekEndDate(dt);
        } else if (dateType === this.getDateTypes().month) {
            dt = DateUtil.dateAdd("m", -1, date);
            dt = DateUtil.getMonthEndDate(dt);
        } else {
            dt = DateUtil.dateAdd("d", -1, date);
        }
        return dt;
    },
    
    /**
     * get 默认结束时间 str
     */
    getDefaultEndDateStr : function(dateType, date) {
        return DateUtil.dateToStr_yyyyMMdd(this.getDefaultEndDate(dateType, date));
    },
    
    /**
     * get 上周/月/日的日期的 开始/结束
     */
    getPre_startAndEndDate : function(dateType, date) {
        return this.get_startAndEndDate(dateType, date, -1);
    },
    
    /**
     * get 周/月/日的日期的 开始/结束
     */
    get_startAndEndDate : function(dateType, date, offset) {
        offset = offset || 0;
        if (date) {
            date = this.toDate(date);
        } else {
            date = new Date();
        }
        
        var ret = {
            startDate : undefined,
            endDate : undefined
        };
        
        var dt;
        if (dateType === this.getDateTypes().week) {
            dt = DateUtil.dateAdd("w", offset, date);
            ret = DateUtil.getStartAndEndDate_byDateType(dt, "w");
        } else if (dateType === this.getDateTypes().month) {
            dt = DateUtil.dateAdd("m", offset, date);
            ret = DateUtil.getStartAndEndDate_byDateType(dt, "m");
        } else {
            dt = DateUtil.dateAdd("d", offset, date);
            ret = DateUtil.getStartAndEndDate_byDateType(dt, "d");
        }
        
        return ret;
    },
    
    /**
     * get 上周/月/日的日期的 开始/结束 str
     */
    getPre_startAndEndDateStr : function(dateType, date) {
        var ret = this.getPre_startAndEndDate(dateType, date);
        
        ret.startDate = DateUtil.dateToStr_yyyyMMdd(ret.startDate);
        ret.endDate = DateUtil.dateToStr_yyyyMMdd(ret.endDate);
        
        return ret;
    },
    
    /**
     * get 上周/月/日的日期的 开始/结束 str
     */
    getPre_startAndEndDateStr_yyyy_MM_dd : function(dateType, date) {
        var ret = this.getPre_startAndEndDate(dateType, date);
        
        ret.startDate = DateUtil.dateToStr_yyyy_MM_dd(ret.startDate);
        ret.endDate = DateUtil.dateToStr_yyyy_MM_dd(ret.endDate);
        
        return ret;
    },
    
    /**
     * get 周/月/日的日期的 开始/结束 str
     */
    get_startAndEndDateStr_yyyy_MM_dd : function(dateType, date) {
        var ret = this.get_startAndEndDate(dateType, date);
        
        ret.startDate = DateUtil.dateToStr_yyyy_MM_dd(ret.startDate);
        ret.endDate = DateUtil.dateToStr_yyyy_MM_dd(ret.endDate);
        
        return ret;
    },
    
    getFullProvinceName : function(provinceName) {
        var arr = [ '安徽省', '北京市', '福建省', '甘肃省', '广东省', '广西壮族自治区', '贵州省', '海南省',
                '河北省', '河南省', '黑龙江省', '湖北省', '湖南省', '吉林省', '江苏省', '江西省', '辽宁省',
                '内蒙古自治区', '宁夏回族自治区', '青海省', '山东省', '山西省', '陕西省', '上海市', '四川省',
                '天津市', '西藏自治区', '新疆建设兵团', '新疆维吾尔自治区', '云南省', '浙江省', '重庆市'];
        for (var i in arr) {
            if (arr[i].indexOf(provinceName) != -1) {
                return arr[i];
            }
        }
        return undefined;
    },
    
    getFullCompanyName : function(provinceName) {
        var arr = [ '福州分公司', '厦门子公司', '国信', '西安分公司', '重庆分公司', '四川分公司', '云南分公司',
                '苏州分公司', '温州分公司' ];
        for (var i in arr) {
            if (arr[i].indexOf(provinceName) != -1) {
                return arr[i];
            }
        }
        return undefined;
    },
    
    getProvinceNameByShortName : function(provinceShortName) {
        var json = {
            "闽" : "福建",
            "鄂" : "湖北",
            "川" : "四川",
            "苏" : "江苏",
            "陕" : "陕西",
            "浙" : "浙江",
            "渝" : "重庆",
        };
        return json[provinceShortName];
    },
    
    /**
     * 单击图表
     */
    clickChart : function(param) {
        console.log(param);
        $state.go("ordinaryList", {search : {aaa : 1}});
    },
};