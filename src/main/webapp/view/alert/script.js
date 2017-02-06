// Code goes here

   var app = angular.module("ngSweetAlert", ['ng-sweet-alert', 'my-alert']);
     app.controller('MainCtrl', ["$scope", "SweetAlert", "myalert", function ($scope, SweetAlert, myalert) {
       $scope.cjx = function() {
//		   SweetAlert.confirm("Are you sure?", {title : "Careful now!"})
//				.then(function(p) {alert(3) },
//					  function(p) { alert(5) }
//				);
           
//           SweetAlert.alert(34);
//           myalert.alert("fdsf");
           myalert("fdsf");
	   };
        $scope.sweet = {};
        $scope.sweet.option = {
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false
        }
        $scope.sweet.confirm = {
            title: 'Deleted!',
            text: 'Your imaginary file has been deleted.',
            type: 'success'
        };

        $scope.sweet.cancel = {
            title: 'Cancelled!',
            text: 'Your imaginary file is safe',
            type: 'error'
        }
        
        $scope.checkCancel=function(){
        console.log("check cancel")
        }
        
         $scope.checkConfirm=function(){
          console.log("check confrim")
        }
        
        
        
    }]);