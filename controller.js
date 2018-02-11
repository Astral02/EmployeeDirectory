
var emplopyeeDirectoryApp = angular.module('emplopyeeDirectoryApp', []);
emplopyeeDirectoryApp.controller('employeeCtrl', ['$scope', '$http', function($scope, $http) {    
    
  var updateView=function(){
         $http.get('/getAllEmployees').then(function(response) {
             console.log("response " + response.data )
         $scope.employees = response.data; 
         console.log(" $scope.employee " + $scope.employees[0]._id, $scope.employees[0].Id )
         $scope.employee="";
        });
  };

  updateView();
  
    $scope.addEmployee = function() {
      $http.post('/createEmployee', $scope.employee).then(function(response) {
        updateView();
      });
    };
    
    $scope.removeEmployee = function(id) {
      $http.delete('/deleteEmployee/' + id).then(function(response) {
          updateView();
      });
    };
    
    $scope.editEmployee = function(id) {
      console.log(id);
      $http.get('/editemployee/' + id).then(function(response) {
      $scope.employee = response;
     });
   };
    
    $scope.updateEmployee = function() {
     console.log($scope.employee.id);
     $http.put('/updateEmployee/' + $scope.employee.id, $scope.employee).then(function(response) {
       updateView();
     });
    };
    

}]);




