/**
 * 模块 基类
 */
var baseModule = MyUtil.defineModule(undefined, function(_super){
    return {
        /**
         * 依赖 s
         */
        deps : undefined,
        
        /**
         * 模块名
         */
        name : undefined,

        /**
         * 模块code
         */
        code : undefined,
        
        /**
         *  初始化子模块
         */
        initModules : false,
        
        /**
         * 是否初始化时执行load()
         */
        loadOnInit : false,
        
        /**
         * 后台url
         */
        url : undefined,
        
        /**
         * 合并祖父模块的请求参数
         */
        mergeParentsReqParams : false,
        
        /**
         * 加载请求类型 get post
         */
        loadRequestType : "GET",
        
        /**
         * 数据模型
         */
        model : {
            /**
             * 请求
             */
            reqParams : {
            },
            
            /**
             * 响应
             */
            resp: undefined,
        },
        
        /**
         * 子模块 {模块名:{}, ...}
         */
        modules : {},
        
        /**
         * 把子模块set到this对象上
         */
        isSetModulesToThis : undefined,
        
//        /**
//         * get 当前模块对应的页面元素
//         */
//        getThisElement : function() {
//            if (this.controllerName) {
//                return angular.element("[ng-controller=" + this.controllerName + "]:first");
//            }
//        },
        
        /**
         * 初始化
         */
        init : function() {
//                    _super.init.apply(this, arguments);
            var that = this;
            
            this.preInit();
            this.doInit();
            this.postInit();
            
            this.dealModules(function(module) {
                if (!module.parentModule) { // 待删 
                    module.parentModule = that;
                }
                if (that.initModules) {
                    module.init();
                }
            });
        },
        
        /**
         * init准备操作
         */
        preInit : function() {
            // 将模块关联到父模块
            if (this.parentModule) {
                var moduleCode = this.code || MyUtil.getUuid();
                this.parentModule.modules[moduleCode] = this;
            }
            
            if (this.isSetModulesToThis) { // 待删
                $.extend(this, this.modules);
            }
        },
        
        /**
         * 处理子模块
         */
        dealModules : function(fn) {
            for (var key in this.modules) {
                fn(this.modules[key]);
            }
        },
        
        /**
         * 执行init
         */
        doInit : function() {
//            console.log("doInit--------" + this.name);
            if (this.loadOnInit) {
                this.load();
            }
        },

        /**
         * 执行完 init
         */
        postInit : function() {
        },
        
        /**
         * 获取祖父模块请求参数
         */
        getParentsReqParams : function() {
            var params = {};
            
            var module = this;
            while (module.parentModule) {
                $.extend(params, module.parentModule.getReqParams());
                module = module.parentModule;
            }
            return params;
        },
        
        /**
         * 获取load()请求参数
         */
        getReqParams : function() {
            var params = $.extend({}, this.model.reqParams);
            return params;
        },
        
        /**
         * 重置请求参数
         */
        resetReqParams : function() {
            this.model.reqParams = {};
        },
        
        /**
         * 加载数据
         */
        load : function() {
            var that = this;

            var params = this.getReqParams();
            
            // 合并祖父模块请求参数
            if (this.mergeParentsReqParams) {
                var parentReqParams = this.getParentsReqParams();
                params = $.extend({}, parentReqParams, params);
            }
            
            logger.log(params);
//            console.log(params);
            
            var $http = window.$http || this.deps.$http;
            $http({
                params : params,
                url : this.url,
                method : this.loadRequestType
            }).then(function(response) {
                that.load_callback(response.data);
            });
        },
        
        /**
         * load 回调函数
         */
        load_callback : function(result) {
            this.model.resp = result.data;
        },
        
        /**
         * load 包括 子模块
         */
        loadAll : function() {
            this.load();
            this.dealModules(function(module) {
                module.loadAll();
            });
        },
    };
});