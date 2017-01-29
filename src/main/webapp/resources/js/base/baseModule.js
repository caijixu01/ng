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
         * 是否初始化时执行load()
         */
        loadOnInit : false,
        
        /**
         * 后台url
         */
        url : undefined,
        
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
        
        /**
         * 初始化
         */
        init : function() {
//                    _super.init.apply(this, arguments);
            this.preInit();
            this.doInit();
        },
        
        /**
         * init准备操作
         */
        preInit : function() {
            if (this.isSetModulesToThis) {
                $.extend(this, this.modules);
            }

            for (var key in this.modules) {
                this.modules[key].parentModule = this;
                this.modules[key].preInit();
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
            
            // 子模块 load
            for (var key in this.modules) {
                this.modules[key].doInit();
            }
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

            this.deps.$http({
                params : this.getReqParams(),
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
    };
});