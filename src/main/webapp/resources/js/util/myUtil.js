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

//        var c = this.getEvent.caller;
//        while (c) {
//            e = c.arguments[0];
//            if (e instanceof Event) {
//                break;
//            }
//            c = c.caller;
//        }

        return e;
    },

    /**
     * 获取事件目标
     */
    getEventTarget : function () {
        var e = this.getEvent();
        if (e) {
            return e.target || e.srcElement;
        }
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
    
    getUuid : function () {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = Math.random()*16|0, v = c == 'x' ? r : (r&0x3|0x8);
            return v.toString(16);
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
     * 将json数组元素字段用逗号拼接
     * 例: [{a:1},{a:2}] --> 1,2
     */
    getJsonArrayFieldValuesByJoin : function(jsonArray, fieldName) {
        var ret = this.getJsonArrayFieldValues(jsonArray, fieldName).join(",");
        if (ret !== "") {
           return ret;
        }
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
     * 导出excel
     */
    exportExcel : function (url, params, filename, $http) {
        return $http({
            url: url,
            method: "GET",
//            headers: {
//                'Content-type': 'application/json'
//            },
            params: params,
            responseType: 'arraybuffer'
        }).success(function (data) {
            var blob = new Blob([data], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
            var objectUrl = URL.createObjectURL(blob);
            var a = document.createElement('a');
            document.body.appendChild(a);
            a.setAttribute('style', 'display:none');
            a.setAttribute('href', objectUrl);
            a.setAttribute('download', filename);
            a.click();
            URL.revokeObjectURL(objectUrl);
        });
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
 * 日志
 */
var logger = (function() {
    // 日志开关 true/false
    var canLog = undefined;
//    var canLog = true;
    
    function getCanLog() {
        if (canLog === undefined) {
            // 默认false
            canLog = false;
//            try {
//                // 读取日志开关
//                var jsonString = $.ajax("cfg/cfg.json", {
//                    timeout : 50,
//                    type : "get",
//                    async : false,
//                }).done(function(data) {
//                    if (data) {
//                        var jsonString = data.replace(/\/\/.*/g, ""); // 删除注释
//                        var json = $.parseJSON(jsonString);
//                        if (json.logger) {
//                            if (json.logger.canLog === true) {
//                                canLog = true;
//                            }
//                        }
//                    }                    
//                });
//            } catch (e) {
//                if (console && console.log) {
//                    console.log(e);
//                }
//            }
        }
        
        return canLog;
    }
    
    return {
        /**
         * 日志开关 true/false
         */
        setCanLog : function(_canLog) {
            canLog = _canLog;
        },

        log : function(obj) {
            if (!getCanLog()) {
                return;
            }
            
            if (console && console.log) {
                console.log(obj);
            }
        }
    };
})();

/**
 * 模块工具类
 */
var ModuleUtil = {
    /**
     * 定义controller
     * @return function
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
                // 待改进...
                parentModule : deps.$scope.$parent.init ? deps.$scope.$parent : undefined,
            });
            
            $.extend(deps.$scope, child);
            deps.$scope.init();
        }

        fn.$inject = depNames;

        return fn;
    },
    
    /**
     * 定义state
     * @param cfg 自定义的config
     * @param stateConfig 用于覆盖生成后的stateConfig
     * @return object
     */
    defineState : function(cfg, stateConfig) {
        return {
            url : "/adminUser",
            templateUrl : "views/adminUser.html",
            controller : "adminUserCtrl",
            controllerAs : "adminUser",
            resolve : {
                deps : [ "$ocLazyLoad", function($ocLazyLoad) {
                    return $ocLazyLoad.load("controllers/adminUser.js");
                } ]
            }
        }
    }
};
