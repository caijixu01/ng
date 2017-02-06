var myApp = angular.module('myApp', [ 'localization' ]);

myApp.controller('MyCtrl', function($rootScope) {
    // default language setting
    $rootScope.language = "en_US";

    $rootScope.changeLang = function() {
        if ($rootScope.language === "en_US") {
            $rootScope.language = "zh_CN";
        } else {
            $rootScope.language = "en_US";
        }
    };
})

// i18n filter
angular.module('localization', []).filter('i18n',
        [ 'localizedTexts', '$rootScope', function(localizedTexts, $rootScope) {
            return function(text) {
                currentLanguage = $rootScope.language || 'en_US';
                if (localizedTexts[currentLanguage].hasOwnProperty(text)) {
                    return localizedTexts[currentLanguage][text];
                }
                return text;
            };
        } ])

// separate dictionary file
angular.module('localization').value('localizedTexts', {
    'zh_CN' : {
        'firstname' : '名',
        'lastname' : '姓',
        'address' : '地址'
    },
    'en_US' : {
        'firstname' : 'First Name',
        'lastname' : 'Last Name',
        'address' : 'Home Address'
    }
});