(function () {

    "use strict";

    var administrationModule = angular.module("administrationModule", []);

    administrationModule.controller("AdministrationController", function ($scope, $location, $http) {


        onLoad()

        //open pages functions 
        $scope.openMangerDetailsDivFunc = function (manger) {
            //dispaly the right div
            $scope.selectedManger = manger
            $scope.mangerDetailsDiv = true
            $scope.EditManger = false;
            $scope.addNewManger = false;

        }

        $scope.EditExistMangerFunc = function () {
            //dispaly the right div
            $scope.EditManger = true;
            $scope.mangerDetailsDiv = false
            $scope.addNewManger = false;

        }
        $scope.openNewMangerForm = function () {
            //dispaly the right div
            $scope.mangerDetailsDiv = false
            $scope.EditManger = false;
            $scope.addNewManger = true;
        }

        //delete manger function
        $scope.deleteMenger = function () {
            //alert before delete
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this manger details",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                //if user approve delete , delete the user and alert the user that user deleted
                $http({
                    method: 'GET',
                    params: {
                        user_id: $scope.selectedManger.user_id
                    },
                    url: "http://localhost/Project4/php/API.php?command=deleteUser"
                }).then(function (response) {
                    if (response.data == "Record deleted successfully") {
                        swal("Deleted!", "student has been deleted.", "success");
                        setInterval(myTimer, 2000);
                        function myTimer() {
                            location.reload()
                        }
                    } else {
                        //if course dosent deleted alert the user
                        sweetAlert("Oops...", "The student is still studying in some of the courses", "error");
                    }

                }, function (err) {
                    alert("error" + err);
                });
            });
        }


        // form validation functions 

        //phone validation for new manger form
        $scope.checkPhoneAvailableNewMangerForm = function () {
            //check if input is empty
            if (!$scope.newMangerPhone) {
                //dispaly the right div
                $scope.noPhoneNewMangerForm = true;
                $scope.PhoneIsInvalidNewMangerForm = false;
                $scope.PhoneIsGoodNewMangerForm = false
                $scope.PhoneIsNotAvailableNewMangerForm = false;
                return;
            }

            var phone = $scope.newMangerPhone
            //regex test for the input
            if (!checkPhoneRegex(phone)) {
                //dispaly the right div
                $scope.PhoneIsInvalidNewMangerForm = true
                $scope.noPhoneNewMangerForm = false
                $scope.PhoneIsGoodNewMangerForm = false
                $scope.PhoneIsNotAvailableNewMangerForm = false;
                return;
            }
            //check if availbale
            if (checkPhoneAvailableInList(phone)) {
                //dispaly the right div
                $scope.PhoneIsInvalidNewMangerForm = false
                $scope.noPhoneNewMangerForm = false
                $scope.PhoneIsGoodNewMangerForm = false
                $scope.PhoneIsNotAvailableNewMangerForm = true;
                return;
            }
            //dispaly the right div
            $scope.PhoneIsInvalidNewMangerForm = false
            $scope.noPhoneNewMangerForm = false
            $scope.PhoneIsNotAvailableNewMangerForm = false;
            $scope.PhoneIsGoodNewMangerForm = true

            readyToSendNewMangerForm()
        }


        //Email validation for new manger form
        $scope.checkEmailAvailableForNewMangerForm = function () {
            //check if input is empty
            if (!$scope.newMangerEmail) {
                //dispaly the right div
                $scope.noEmailNewMangerForm = true;
                $scope.EmailIsInvalidNewMangerForm = false;
                $scope.EmailIsGoodNewMangerForm = false
                $scope.EmailIsNotAvailableNewMangerForm = false;
                return;
            }

            var email = $scope.newMangerEmail;
            //regex test for the input
            if (!checkMailRegex(email)) {
                //dispaly the right div
                $scope.EmailIsInvalidNewMangerForm = true
                $scope.noEmailNewMangerForm = false
                $scope.EmailIsGoodNewMangerForm = false
                $scope.EmailIsNotAvailableNewMangerForm = false;
                return;
            }
            //check if availbale
            if (checkMailAvailableInList(email)) {
                //dispaly the right div
                $scope.EmailIsInvalidNewMangerForm = false
                $scope.noEmailNewMangerForm = false
                $scope.EmailIsGoodNewMangerForm = false
                $scope.EmailIsNotAvailableNewMangerForm = true;
                return;
            }
            //dispaly the right div
            $scope.EmailIsInvalidNewMangerForm = false
            $scope.noEmailNewMangerForm = false
            $scope.EmailIsNotAvailableNewMangerForm = false;
            $scope.EmailIsGoodNewMangerForm = true

            readyToSendNewMangerForm()

        }


        //update manger form 
        //mail validation
        $scope.checkEmailAvailableForUpdateForm = function () {

            //check if input is empty
            if (!$scope.selectedManger.email) {
                //dispaly the right div
                $scope.noEmailUpdateForm = true;
                $scope.EmailIsInvalidUpdateForm = false;
                $scope.EmailIsGoodUpdateForm = false
                $scope.EmailIsNotAvailableUpdateForm = false;
                return;
            }

            var email = $scope.selectedManger.email;
            //regex test for the input
            if (!checkMailRegex(email)) {
                //dispaly the right div
                $scope.EmailIsInvalidUpdateForm = true
                $scope.noEmailUpdateForm = false
                $scope.EmailIsGoodUpdateForm = false
                $scope.EmailIsNotAvailableUpdateForm = false;
                return;
            }
            //check if availbale
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].email == email && $scope.users[i].user_id != $scope.selectedManger.user_id) {
                    //dispaly the right div
                    $scope.EmailIsInvalidUpdateForm = false
                    $scope.noEmailUpdateForm = false
                    $scope.EmailIsGoodUpdateForm = false
                    $scope.EmailIsNotAvailableUpdateForm = true;
                    return;
                }
            }

            //dispaly the right div
            $scope.EmailIsInvalidUpdateForm = false
            $scope.noEmailUpdateForm = false
            $scope.EmailIsNotAvailableUpdateForm = false;
            $scope.EmailIsGoodUpdateForm = true
            readyToSendNewUpdateForm()
        }

        //phone validation
        $scope.checkPhoneAvailableUpdateForm = function () {
            //check if input is empty
            if (!$scope.selectedManger.phone) {
                //dispaly the right div
                $scope.noPhoneUpdateForm = true;
                $scope.PhoneIsInvalidUpdateForm = false;
                $scope.PhoneIsGoodUpdateForm = false
                $scope.PhoneIsNotAvailableUpdateForm = false;
                return;
            }

            var phone = $scope.selectedManger.phone;
            //regex test for the input
            if (!checkPhoneRegex(phone)) {
                //dispaly the right div
                $scope.PhoneIsInvalidUpdateForm = true
                $scope.noPhoneUpdateForm = false
                $scope.PhoneIsGoodUpdateForm = false
                $scope.PhoneIsNotAvailableUpdateForm = false;
                return;
            }
            //check if availbale
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].phone == phone && $scope.users[i].user_id != $scope.selectedManger.user_id) {
                    //dispaly the right div
                    $scope.PhoneIsInvalidUpdateForm = false
                    $scope.noPhoneUpdateForm = false
                    $scope.PhoneIsGoodUpdateForm = false
                    $scope.PhoneIsNotAvailableUpdateForm = true;
                    return;
                }
            }

            //dispaly the right div
            $scope.PhoneIsInvalidUpdateForm = false
            $scope.noPhoneUpdateForm = false
            $scope.PhoneIsNotAvailableUpdateForm = false;
            $scope.PhoneIsGoodUpdateForm = true
            readyToSendNewUpdateForm()

        }


        //check E-mail input with regex
        function checkMailRegex(email) {
            var pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
            if (pattern.test(email)) {
                return true;
            }
            return false;
        }

        //check if E-mail is available
        function checkMailAvailableInList(email) {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].email == email) {
                    return true;
                }

            }
            return false;
        }



        //check if phone is available
        function checkPhoneAvailableInList(phone) {
            for (var i = 0; i < $scope.users.length; i++) {
                if ($scope.users[i].phone == phone) {
                    return true;
                }
            }
            return false;
        }

        //check phone input with regex
        function checkPhoneRegex(phone) {
            var pattern = /^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/;
            if (pattern.test(phone)) {
                return true;
            }
            return false;
        }

        //confirm after validation
        //update manger form
        function readyToSendNewUpdateForm() {
            if ($scope.EmailIsGoodUpdateForm && $scope.PhoneIsGoodUpdateForm) {
                $scope.submitUpdateForm = true
            }
        }

        //new manger form
        function readyToSendNewMangerForm() {
            if ($scope.EmailIsGoodNewMangerForm && $scope.PhoneIsGoodNewMangerForm) {
                $scope.readyToAddNewStudentNewStudentForm = true

            }
        }

        //change image on hover functions
        $scope.changeImageUpdateForm = function () {
            $("#my_file").click();
            $("#imageUpdateForm").attr("src", "./image/logo/noImage.PNG");
        }


        function onLoad() {
            //check if user is a manger or a student 
            var user = JSON.parse(sessionStorage.user);
            $scope.user = user;
            if (user.role == "manger") {
                $scope.isManger = true;
            } else {
                $scope.isManger = false;
            }

            //ajax call to get all the users for display 
            $http({
                method: 'GET',
                url: "http://localhost/Project4/php/API.php?command=getAllUsers"
            }).then(function (response) {
                var users = response.data;
                var students = []
                var mangers = []
                for (var i = 0; i < users.length; i++) {
                    if (users[i].role == "manger") {
                        mangers.push(users[i])
                    } else {
                        students.push(users[i])
                    }

                }
                $scope.users = users
                $scope.students = students;
                $scope.mangers = mangers;

            }, function (err) {
                alert("error" + err);
            });
        }


        //logout function
        $scope.logout = function () {
            sessionStorage.clear();
            $location.path("/logIn")
        }


    })
})();