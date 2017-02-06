/**
 * 弹窗 基类
 */
var _modalDialog = (function() {
	var that = {
	    /**
	     * 包含的页面的domainName
	     */
	    innerDomainName : undefined,
	    
		/**
		 * 弹窗里面的页面的url
		 */
		url : undefined,
		
		/**
		 * 向弹窗传递的参数 {}
		 */
		arguments : undefined,
		
		/**
		 * 弹窗标题
		 */
		title : undefined,
		
		/**
		 * 弹窗的外观参数 {width : 800}
		 */
		features : {},
		
		/**
		 * 触发弹窗的input框
		 */
		_input : undefined,
		
		/**
		 * 弹窗返回值
		 */
		returnValue : undefined,
		
		/**
		 * 弹窗 dom jquery对象
		 * private
		 */
		$modalDialog : undefined,
		// ----------------------------------------------------------------------
		/**
		 * 显示弹窗
		 * @param arguments 弹窗入参, 传给后台
		 * @param callbackOnClose 弹窗关闭回调函数
		 */
		show : function(arguments, callbackOnClose) {
		    if (this.innerDomainName) {
		        $.extend(arguments, {"_domainName" : this.innerDomainName});
		    }
		    
			this._input = myUtil.getEventTarget();
			
			$.extend(this.arguments, arguments);
			
			var _that = this;
			var _that_callbackOnClose = this.callbackOnClose;
			this.callbackOnClose = function() {
				// 执行成员callbackOnClose
				_that_callbackOnClose.call(_that, _that.returnValue);
				
				// 执行入参callbackOnClose
				if (callbackOnClose) {
					callbackOnClose(_that.returnValue);
				}
			};
			
			// 先创建弹窗对象
			if (!this.$modalDialog) {
				this.createModalDialog();
			}
			
			// 弹窗加载页面
			var ajaxData = $.extend({}, this.arguments, arguments);
			myUtil.callModule(this.url,
								this.$modalDialog.find("[body]:first"),
								ajaxData,
								this
			);
			
			// 显示弹窗
			this.$modalDialog.modal("show");
		},
		
		/**
		 * showByOption
		 */
		showByOption : function(option, arguments, callbackOnClose) {
		    $.extend(this, option);
		    this.show(arguments, callbackOnClose);
		},
		
		/**
		 * 弹窗回调函数
		 */
		callbackOnClose : function(vo) {
		},
		
		/**
		 * 生成弹窗DOM对象, 添加到body尾部.
		 */
		createModalDialog : function() {
		    var windowWidth = 800;
	        if (this.features.width) {
	            windowWidth = this.features.width;
	        }
			var html =  "<div class='modal-type-content modal fade' tabindex='-1'" + 
						"    data-backdrop='static' role='dialog'" + 
						"    aria-labelledby='mySmallModalLabel' aria-hidden='true'>" + 
						"    <div class='modal-dialog modal-big width-" + windowWidth + "'>" + 
						"        <div class='modal-content'>" + 
						"            <div class='magic-modal-header header-medium-ioc'>" + 
						"                <div title class='modal-name'></div>" + 
						"                <div closeBtn class='modal-close'></div>" + 
						"            </div>" + 
						"            <div class='magic-modal-container'>" + 
						"                <div class='modal-body-content'>" + 
						"                    <div body class='tempTable-form'>" + 
						"                    </div>" + 
						"                </div>" + 
						"            </div>" + 
						"        </div>" + 
						"    </div>" + 
						"</div>";
			
			// 弹窗添加到body尾部.
			var d = $(html).appendTo("body");
			
			// 绑定弹窗关闭回调函数
			d.on("hidden.bs.modal", this.callbackOnClose);
			
			// 弹窗标题
			d.find("[title]").html(this.title);
			
			// 弹窗关闭按钮
			d.find("[closeBtn]").click(function() {
				d.modal("hide");
			});
			
			this.$modalDialog = d;
		},
	};
	
	return that;
})();
