"use strict"
var myapp= angular.module('myapp',["ui.router"]);

myapp.controller('myctrl', ["$scope","$http", function($scope,$http){

$scope.myname="nitish"
$scope.user={
    email:"nit",
    password:"sss"
}
$scope.login=function(user){
    $http.post("/login",user).then(function(data){
        console.log("loged in ",data)
    })
}
}])