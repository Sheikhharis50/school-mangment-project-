(function () {

    "use strict";


    var logInModule = angular.module("logInModule", []);

    logInModule.controller("LogInController", function ($scope, $http, $location) {

        onLoad();

        //when user login function 
        $scope.logIn = function () {
            var email = $scope.userEmail;
            var password = $scope.userPassword;

            //ajax call to check user details and get in to the website 
            $http({
                method: 'GET',
                params: {
                    email: email,
                    password: password
                },
                url: "http://localhost/Project4/php/API.php?command=getOneUser"
            }).then(function (response) {
                //if user details are correct user will move to the website 
                //if not he will see a note that tells him "email or password is incorrect
                if (response.data != "null") {
                    var user = response.data
                    sessionStorage.userLoggedIn = true;
                    sessionStorage.user = JSON.stringify(user)
                    $location.path("/school")
                } else {
                    $scope.userNotExist = true;
                }
            })
        }

        //user forgat password 
        //open the div with the form to fill when user forgat password
        $scope.forgatPasswordDivFunc = function () {
            $("#forgatPasswordDiv").fadeIn("slow");
            $scope.fillDetailsform = true;
            $scope.enterNewPasswordForm = false;
            $scope.newPasswordCreate = false

        }


        //after user fill the form of forgating password functoin 
        $scope.userForgatPasswordFormSubmit = function () {
            //get all the details that the user writh in the input box
            var firstName = $scope.userForgatPassword.firstName
            var lastName = $scope.userForgatPassword.lastName
            var phone = $scope.userForgatPassword.phone
            var email = $scope.userForgatPassword.email

            //ajax call to check if user exsist
            $http({
                method: 'GET',
                params: {
                    firstName: firstName,
                    lastName: lastName,
                    phone: phone,
                    email: email
                },
                url: "http://localhost/Project4/php/API.php?command=getOneUserForgatPassword"
            }).then(function (response) {
                //if user exsist open anther form if not he will see a note about it 
                if (response.data != "null") {
                    $scope.ForgatPasswordUser = response.data
                    $scope.fillDetailsform = false;
                    $scope.newPasswordCreate = false
                    $scope.enterNewPasswordForm = true;
                } else {
                    $scope.ForgatPasswordUserNotExist = true
                }
            })
        }
        //create a new password for user function 
        $scope.createNewPasswordForUser = function () {
            //get all the details that the user writh in the input box
            var user_id = $scope.ForgatPasswordUser.user_id;
            var newPassword = $scope.userForgatPassword.newPassword;

            //ajax call that create a new password for the user  
            $http({
                method: 'GET',
                params: {
                    user_id: user_id,
                    password: newPassword
                },
                url: "http://localhost/Project4/php/API.php?command=updateUserPassword"
            }).then(function (response) {
                //display the right div 
                $scope.fillDetailsform = false;
                $scope.enterNewPasswordForm = false;
                $scope.newPasswordCreate = true
                setInterval(myTimer, 3000);
                function myTimer() {
                    $("#forgatPasswordDiv").fadeOut("slow");
                    $scope.fillDetailsform = false;
                    $scope.enterNewPasswordForm = false;
                    $scope.newPasswordCreate = false


                }
            })
        }

        function onLoad() {
            $("#forgatPasswordDiv").hide()
        }
    })
})();

