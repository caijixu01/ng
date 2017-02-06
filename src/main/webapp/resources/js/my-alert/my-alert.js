(function() {
    'use strict';

    angular.module('my-alert', []).factory('myalert', [function() {
        var fn = my_alert;
        
        fn.alert = my_alert;
        fn.confirm = my_confirm;
        fn.info = my_info;
        fn.success = my_success;
        fn.error = my_error;
        
        return fn;
        
        // -----------------
        function showDom(message, options) {
            
//            title : "提示",
//            text : message,
//            type : "warning",
//            showCancelButton : true
            
            var template = '<div class="dialog-mask">' +
                          '    <div class="dialog-box">' +
                          '        <div class="dialog-header">' + options.title + '</div>' +
                          '        <div class="dialog-content">' +
                          '            <span class="dialog-icon"></span>' +
                          '            <p class="dialog-text">' + options.text + '</p>' +
                          '            <div class="dialog-btn">';
            
            if (options.showCancelButton) {
                template += '              <button class="dialog-item-btn left" type="button">取消</button>';
            }
            
            template +=   '                <button class="dialog-item-btn right" type="button">确定</button>' +
                          '            </div>' +
                          '        </div>' +
                          '    </div>' +
                          '</div>';
            
            $(template).appendTo("body");
        }

        function my_alert(message, options) {
            return my_confirm(message, $.extend({
                text : message,
                type : "warning",
                showCancelButton : false
            }, options));
        }

        function my_info(message, options) {
            return my_alert(message, $.extend({
                type : "info"
            }, options));
        }

        function my_success(message, options) {
            return my_alert(message, $.extend({
                type : "success"
            }, options));
        }

        function my_error(message, options) {
            return my_alert(message, $.extend({
                type : "error"
            }, options));
        }
        
        function my_confirm(message, options) {
//            var defered = $q.defer();
            var options = $.extend({
                title : "提示",
                text : message,
                type : "warning",
                showCancelButton : true
            }, options);
            
            setTimeout(function() {
                showDom(message, options);
            }, 50);
            
//            swal(options, function(r) {
//                defered.resolve(r);
//            }, function(e) {
//                defered.reject(e);
//            });
//            return defered.promise;
        }
    } ]);

})();
