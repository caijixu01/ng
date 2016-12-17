(function() {
    'use strict';
    var myModule = angular.module("HelloAngular", ["isteven-multi-select","pascalprecht.translate"]);
    myModule.controller("helloAngular", [ "$scope", function($scope) {
//        var d = angular.element(".cjx");
//        console.log(d);
        $scope.code = "cjx";
        
        $scope.greeting = {
            text : "hello",
            text2 : "hello2",
        };
        
        $scope.lang = {"selectAll" : "全选"};
        
        $scope.modernBrowsers = [
                {
                    icon : '<img src="https://cdn1.iconfinder.com/data/icons/fatcow/32/opera.png" />',
                    name : 'Opera',
                    maker : 'Opera Software',
                    ticked : false
                },
                {
                    icon : '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32/internet_explorer.png" />',
                    name : 'Internet Explorer',
                    maker : 'Microsoft',
                    ticked : false
                },
                {
                    icon : '<img  src="https://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png" />',
                    name : 'Firefox',
                    maker : 'Mozilla Foundation',
                    ticked : true
                },
                {
                    icon : '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32x32/safari_browser.png" />',
                    name : 'Safari',
                    maker : 'Apple',
                    ticked : false
                },
                {
                    icon : '<img  src="https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/chrome.png" />',
                    name : 'Chrome',
                    maker : 'Google',
                    ticked : false
                } ];
        
        $scope.modernBrowsers2 = [
                                 {
                                     icon : '<img src="https://cdn1.iconfinder.com/data/icons/fatcow/32/opera.png" />',
                                     name : 'Opera',
                                     maker : 'Opera Software',
                                     ticked : false
                                 },
                                 {
                                     icon : '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32/internet_explorer.png" />',
                                     name : 'Internet Explorer',
                                     maker : 'Microsoft',
                                     ticked : false
                                 },
                                 {
                                     icon : '<img  src="https://cdn1.iconfinder.com/data/icons/humano2/32x32/apps/firefox-icon.png" />',
                                     name : 'Firefox',
                                     maker : 'Mozilla Foundation',
                                     ticked : true
                                 },
                                 {
                                     icon : '<img  src="https://cdn1.iconfinder.com/data/icons/fatcow/32x32/safari_browser.png" />',
                                     name : 'Safari',
                                     maker : 'Apple',
                                     ticked : false
                                 },
                                 {
                                     icon : '<img  src="https://cdn1.iconfinder.com/data/icons/google_jfk_icons_by_carlosjj/32/chrome.png" />',
                                     name : 'Chrome',
                                     maker : 'Google',
                                     ticked : false
                                 } ];
        
        $scope.outputBrowsers = [
             {   icon: "www",   name: "eeee",   maker: "qqq", ticked: true  },
         ];
    } ]);
})();
