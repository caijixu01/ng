"use strict"
var MyUtil = {
    /**
     * 定义 模块
     */
    defineModule : function(parent, childFun) {
        var parentClone = $.extend(true, {}, parent); 
        return $.extend({}, parentClone, childFun(parentClone));
    },
    
    /**
     * 获取Event事件
     */
    getEvent : function () {
        var e = window.event;
        if (e) {
            return e;
        }

        var c = this.getEvent.caller;
        while (c) {
            e = c.arguments[0];
            if (e instanceof Event) {
                break;
            }   
            c = c.caller;
        }

        return e;
    },

    /**
     * 获取事件目标
     */
    getEventTarget : function () {
        var e = this.getEvent();
        return e.target || e.srcElement;
    },
    
    /**
     * ajax
     */
    ajax : function(url, p) {
        p = $.extend({
            url : url,
            type : "post",
            contentType : "application/json; charset=utf-8",
            datatype : "json",
        }, p);
        
        if (p.data && p.type.toLowerCase() === "post") {
            p.data = JSON.stringify(p.data);
        }
        
        var _result;
        $.ajax(p).done(function(result) {
            _result = result;
            
            if (typeof result === "string") {
                result = $.parseJSON(result);
            }
            
            if ($.isFunction(p.callback)) {
                p.callback(result);
            }
        });
        
        return _result;
    },
    
    /**
     * ajax_get
     */
    ajax_get : function(url, data, callback) {
        this.ajax(url, {
            type : "get",
            data : data,
            callback : callback,
        });
    },
    
    /**
     * get json数组某个字段的值
     * @return 返回array
     */
    getJsonArrayFieldValues : function(jsonArray, fieldName) {
        return $.map(jsonArray, function(json) {
            return json[fieldName];
        });
    },
    
    /**
     * getValueByFieldNames({a:{b:2}}, "a.b") 返回 2
     */
    getValueByFieldNames : function(json, fieldNames) {
        var fieldName_arr = fieldNames.split(".");
        
        var retVal = json;
        
        for (var i in fieldName_arr) {
            if (retVal) {
                retVal = retVal[fieldName_arr[i]];
            } else {
                return undefined;
            }
        }
        return retVal;
    },

    /**
     * 获取省份列表
     */
    getProvinces : function() {
        return [ {
            name : "闽",
        }, {
            name : "鄂",
        }, {
            name : "川",
        }, {
            name : "苏",
        }, {
            name : "陕",
        }, {
            name : "浙",
        }, {
            name : "渝",
        } ];
    },
    
    /**
     * 判断两个对象是否相等
     */
    isObjectValueEqual : function(a, b) {
        // Of course, we can do it use for in 
        // Create arrays of property names
        if (a === b) {
            return true;
        }
        
        if (a === undefined || b === undefined) {
            return false;
        }
        
        var aProps = Object.getOwnPropertyNames(a);
        var bProps = Object.getOwnPropertyNames(b);
     
        // If number of properties is different,
        // objects are not equivalent
        if (aProps.length != bProps.length) {
            return false;
        }
     
        for (var i = 0; i < aProps.length; i++) {
            var propName = aProps[i];
     
            // If values of same property are not equal,
            // objects are not equivalent
            if (a[propName] !== b[propName]) {
                return false;
            }
        }
     
        // If we made it this far, objects
        // are considered equivalent
        return true;
    },
    
    /**
     * json转url参数
     */
    parseUrlParam : function(param, key) {
        var that = this;
        var paramStr = "";
        if (typeof param === "string" || typeof param === "number" || typeof param === "boolean") {
            paramStr += "&" + key + "=" + encodeURIComponent(param);
        } else {
            $.each(param, function(i) {
                var k = key == null ? i : key + (param instanceof Array ? "[" + i + "]" : "." + i);
                paramStr += '&' + that.parseUrlParam(this, k);
            });
        }
        return paramStr.substr(1);
    },
    
    /**
     * 导出报表
     */
    exportReport : function(url, params, fileName) {
        var _url = url + "?" + this.parseUrlParam(params);
        window.location = _url;
    },
};

var NumberUtil = {
    multiply : function(num, num2) {
        if (num) {
            return Math.ceil(num * num2);
        }
        return undefined;
    },
};

var ArrayUtil = {
    getByField : function(array, fieldName, fieldValue) {
        array = array || [];
        for (var i = 0; i < array.length; i++) {
            if (array[i][fieldName] === fieldValue) {
                return array[i];
            }
        }
        return {};
    },
};

var StringUtil = {
    lPad : function(str, n) {
        var len = str.length;
        while(len < n) {
            str = " " + str;
            len++;
        }
        return str;
    }        
};

/**
 * 模块工具类
 */
var ModuleUtil = {
    /**
     * 返回一个function
     */
    defineController : function(depNames, parent, childFn) {
        function getDeps(depNames, depValues) {
            var c = {};
            for ( var i in depNames) {
                c[depNames[i]] = depValues[i];
            }
            return c;
        }
        
        function fn() {
            if ($.inArray("$scope", depNames) == -1) {
                depNames.push("$scope");
            }
            var deps = getDeps(depNames, arguments);
            var parentClone = $.extend(true, {}, parent); 
            var child = $.extend({}, parentClone, childFn(parentClone, deps), {
                deps : deps,
            });
            $.extend(deps.$scope, child);
            deps.$scope.init();
        }
        
        fn.$inject = depNames;

        return fn;
    }      
};