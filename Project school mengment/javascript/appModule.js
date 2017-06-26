(function () {
    //https://www.youtube.com/watch?v=HUPkpDTvM8E
    "use strict";
    var appModule = angular.module("appModule", ["ngRoute", "logInModule", "schoolModule", "administrationModule"]);



    appModule.config(function ($routeProvider) {

        $routeProvider.when("/logIn", {
            resolve: {
                "check": function ($location) {
                    if (sessionStorage.userLoggedIn) {
                        $location.path("/school");
                    }
                }
            },
            controller: "LogInController",
            templateUrl: "./html/logInView.html"
        });
        $routeProvider.when("/school", {
            resolve: {
                "check": function ($location) {
                    if (!sessionStorage.userLoggedIn) {
                        $location.path("/logIn");
                    }
                }
            },
            controller: "SchoolController",
            templateUrl: "./html/schoolView.html"
        });
        $routeProvider.when("/administration", {
            resolve: {
                "check": function ($location) {
                    if (!sessionStorage.userLoggedIn) {
                        $location.path("/logIn");
                    }
                }
            },
            controller: "AdministrationController",
            templateUrl: "./html/administrationView.html"
        });

        //במידה והכתובת לא זוהתה
        $routeProvider.otherwise({
            redirectTo: "/logIn"

        });


    })
})();
