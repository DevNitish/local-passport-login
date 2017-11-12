myapp.config(["$stateProvider","$urlRouterProvider",function($stateProvider,$urlRouterProvider){

    $urlRouterProvider.otherwise('/')

    $stateProvider
    .state('login',{
        url:"login",
        templateUrl:"login2.ejs",
        controller:"myctrl"

    })
}])