/**
 * 图表模块 基类
 */
var baseListModule = MyUtil.defineModule(baseModule, function(_super) {
	return {
        loadOnInit : true,

        /**
	     * 列表导出url
	     */
	    exportReportUrl : undefined,

	    /**
	     * 是否显示simple搜索框
	     */
	    isShowSimpleSearcher: true,

        /**
         * 是否显示搜索框
         */
        isShowSearcher: false,
        
        /**
         * 是否分页
         */
        isPaging : true,

        /**
         * 获取load()请求参数
         */
        getReqParams : function() {
            var params = _super.getReqParams.apply(this, arguments);
            
            if (this.isPaging) {
                params.page_num = params.page_num || 1;
                params.page_size = params.page_size || 20;
            }

            return params;
        },

        keyUpSearch : function(e) {
            var keycode = window.event ? e.keyCode : e.which;
            if (keycode == 13) {
                this.load();
            }
        },

        showSearcher : function() {
            this.isShowSearcher = true;
            this.isShowSimpleSearcher = false;
        },

        hideSearcher : function() {
            this.isShowSearcher = false;
            this.isShowSimpleSearcher = true;
        },

        /**
         * 列表导出
         */
        exportReport : function() {
            var params = this.getReqParams();
            delete params.page_num;
            delete params.page_size;

            MyUtil.exportExcel(
                    this.exportReportUrl,
                    params,
                    this.title + ".xls",
                    this.deps.$http);
        }
	};
});
