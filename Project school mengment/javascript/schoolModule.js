(function () {

    "use strict";

    var schoolModule = angular.module("schoolModule", []);



    schoolModule.controller("SchoolController", function ($scope, $location, $http) {

        onLoad()

        //open pages functions 
        $scope.openEditCoursFunc = function () {
            //dispaly the right div
            $scope.studentSelectedDiv = false;
            $scope.addNewStudent = false;
            $scope.addNewCourse = false
            $scope.selectedCourse = false
            $scope.EditStudent = false
            $scope.updateCoursePage = true
        }


        $scope.studentPage = function (userID) {
            //find the student that the user want to see is details 
            for (var i = 0; i <= $scope.students.length; i++) {
                if ($scope.students[i].user_id == userID) {
                    $scope.selectedStudent = $scope.students[i];
                    break;
                }
            }

            //ajax call to get the student details and his curses 
            $http({
                method: 'GET',
                params: {
                    user_ID: userID
                },
                url: "http://localhost/Project4/php/API.php?command=getAllStudentCoursesAndInfromtion"

            }).then(function (response) {
                $scope.selectedStudent.courses = response.data
            }, function (err) {
                alert("error" + err);
            });

            //dispaly the right div

            $scope.addNewStudent = false
            $scope.addNewCourse = false
            $scope.selectedCourse = false
            $scope.EditStudent = false
            $scope.updateCoursePage = false
            $scope.studentSelectedDiv = true;



        }




        $scope.addNewStudentfunc = function () {
            //dispaly the right div

            $scope.studentSelectedDiv = false;
            $scope.addNewStudent = true
            $scope.addNewCourse = false
            $scope.selectedCourse = false
            $scope.updateCoursePage = false
            $scope.EditStudent = false
        }


        $scope.addNewCourseFunc = function () {
            //dispaly the right div

            $scope.studentSelectedDiv = false;
            $scope.addNewStudent = false;
            $scope.addNewCourse = true
            $scope.selectedCourse = false
            $scope.updateCoursePage = false
            $scope.EditStudent = false

        }


        $scope.EditExistStudentFunc = function (student) {
            //dispaly the right div

            $scope.selectedStudentToEdit = student
            $scope.EditStudent = true
            $scope.selectedCourse = false
            $scope.studentSelectedDiv = false;
            $scope.addNewStudent = false
            $scope.addNewCourse = false
            $scope.updateCoursePage = false

        }

        $scope.userSelectCourseFunc = function (cousreID) {
            //find the course that the user want to see is details 
            for (var i = 0; i <= $scope.courses.length; i++) {
                if ($scope.courses[i].course_id == cousreID) {
                    $scope.selectedCourseDetails = $scope.courses[i];
                    break;
                }
            }

            //ajax call to get all the student that take part of this course 
            $http({
                method: 'GET',
                params: {
                    courseID: cousreID
                },
                url: "http://localhost/Project4/php/API.php?command=getAllStudentInCourse"

            }).then(function (response) {
                $scope.studentTakeCourse = response.data;
                $scope.selectedCourseDetails.numberOfStudent = response.data.length;
            }, function (err) {
                alert("error" + err);
            });
            //dispaly the right div

            $scope.selectedCourse = true
            $scope.studentSelectedDiv = false;
            $scope.addNewStudent = false
            $scope.addNewCourse = false
            $scope.EditStudent = false
            $scope.updateCoursePage = false



        }


        //delete buttun functions 
        //delete course
        $scope.deleteCourse = function (course_id) {
            //alert before delete
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
                type: "warning",
                showCancelButton: true,
                confirmButtonColor: "#DD6B55",
                confirmButtonText: "Yes, delete it!",
                closeOnConfirm: false
            }, function () {
                //if user approve delete , delete the course and anlert the user that course deleted
                $http({
                    method: 'GET',
                    params: {
                        course_id: course_id
                    },
                    url: "http://localhost/Project4/php/API.php?command=deleteCourse"
                }).then(function (response) {
                    if (response.data == "Record deleted successfully") {
                        swal("Deleted!", "course has been deleted.", "success");
                        setInterval(myTimer, 2000);
                        function myTimer() {
                            location.reload()
                        }
                    } else {
                        //if course dosent deleted alert the user
                        sweetAlert("Oops...", "course have some stuednt that study", "error");
                    }

                }, function (err) {
                    alert("error" + err);
                });
            });
        }


        //delete student function 
        $scope.deleteStudent = function (user_id) {
            //alert before delete
            swal({
                title: "Are you sure?",
                text: "You will not be able to recover this imaginary file!",
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
                        user_id: user_id
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

        //update student form 
        //mail 
        $scope.checkEmailAvailableForUpdateForm = function () {

            //check if input is empty
            if (!$scope.selectedStudentToEdit.email) {
                //dispaly the right div
                $scope.noEmailUpdateForm = true;
                $scope.EmailIsInvalidUpdateForm = false;
                $scope.EmailIsGoodUpdateForm = false
                $scope.EmailIsNotAvailableUpdateForm = false;
                return;
            }

            var email = $scope.selectedStudentToEdit.email;
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
                if ($scope.users[i].email == email && $scope.users[i].user_id != $scope.selectedStudentToEdit.user_id) {
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


        //phone
        $scope.checkPhoneAvailableUpdateForm = function () {
            //check if input is empty
            if (!$scope.selectedStudentToEdit.phone) {
                //dispaly the right div
                $scope.noPhoneUpdateForm = true;
                $scope.PhoneIsInvalidUpdateForm = false;
                $scope.PhoneIsGoodUpdateForm = false
                $scope.PhoneIsNotAvailableUpdateForm = false;
                return;
            }

            var phone = $scope.selectedStudentToEdit.phone;
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
                if ($scope.users[i].phone == phone && $scope.users[i].user_id != $scope.selectedStudentToEdit.user_id) {
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


        //Email validation ON Edding New student
        $scope.checkEmailAvailableForNewStudentForm = function () {
            //check if input is empty
            if (!$scope.newStudentEmail) {
                //dispaly the right div
                $scope.noEmailNewStudentForm = true;
                $scope.EmailIsInvalidNewStudentForm = false;
                $scope.EmailIsGoodNewStudentForm = false
                $scope.EmailIsNotAvailableNewStudentForm = false;
                return;
            }

            var email = $scope.newStudentEmail;
            //regex test for the input
            if (!checkMailRegex(email)) {
                //dispaly the right div
                $scope.EmailIsInvalidNewStudentForm = true
                $scope.noEmailNewStudentForm = false
                $scope.EmailIsGoodNewStudentForm = false
                $scope.EmailIsNotAvailableNewStudentForm = false;
                return;
            }
            //check if availbale
            if (checkMailAvailableInList(email)) {
                //dispaly the right div
                $scope.EmailIsInvalidNewStudentForm = false
                $scope.noEmailNewStudentForm = false
                $scope.EmailIsGoodNewStudentForm = false
                $scope.EmailIsNotAvailableNewStudentForm = true;
                return;
            }
            //dispaly the right div
            $scope.EmailIsInvalidNewStudentForm = false
            $scope.noEmailNewStudentForm = false
            $scope.EmailIsNotAvailableNewStudentForm = false;
            $scope.EmailIsGoodNewStudentForm = true

            readyToSendNewStudentForm()

        }


        //phone validation for new student form
        $scope.checkPhoneAvailableNewStudentForm = function () {
            //check if input is empty
            if (!$scope.newStudentPhone) {
                //dispaly the right div
                $scope.noPhoneNewStudentForm = true;
                $scope.PhoneIsInvalidNewStudentForm = false;
                $scope.PhoneIsGoodNewStudentForm = false
                $scope.PhoneIsNotAvailableNewStudentForm = false;
                return;
            }

            var phone = $scope.newStudentPhone;
            //regex test for the input
            if (!checkPhoneRegex(phone)) {
                //dispaly the right div
                $scope.PhoneIsInvalidNewStudentForm = true
                $scope.noPhoneNewStudentForm = false
                $scope.PhoneIsGoodNewStudentForm = false
                $scope.PhoneIsNotAvailableNewStudentForm = false;
                return;
            }
            //check if availbale
            if (checkPhoneAvailableInList(phone)) {
                //dispaly the right div
                $scope.PhoneIsInvalidNewStudentForm = false
                $scope.noPhoneNewStudentForm = false
                $scope.PhoneIsGoodNewStudentForm = false
                $scope.PhoneIsNotAvailableNewStudentForm = true;
                return;
            }
            //dispaly the right div
            $scope.PhoneIsInvalidNewStudentForm = false
            $scope.noPhoneNewStudentForm = false
            $scope.PhoneIsNotAvailableNewStudentForm = false;
            $scope.PhoneIsGoodNewStudentForm = true

            readyToSendNewStudentForm()
        }

        //check phone input with regex
        function checkPhoneRegex(phone) {
            var pattern = /^((\+972|972)|0)( |-)?([1-468-9]( |-)?\d{7}|(5|7)[0-9]( |-)?\d{7})$/;
            if (pattern.test(phone)) {
                return true;
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


        //change image on hover functions
        $scope.changeImageUpdateCourseForm = function () {
            $("#my_fileUpdateCourseForm").click();
            $("#imageUpdateCourseForm").attr("src", "./image/logo/noImage.PNG");
        }
        $scope.changeImageUpdateForm = function () {
            $("#my_file").click();
            $("#imageUpdateForm").attr("src", "./image/logo/noImage.PNG");
        }


        //check if student take the course function 
        $scope.checkIfStudentTakeCourse = function (courseName) {
            //check if function is ready to active
            if ($scope.selectedStudent == undefined) {
                return;
            }
            //check if function is ready to active
            if ($scope.selectedStudent.courses == undefined) {
                return;
            }
            for (var i = 0; i < $scope.selectedStudent.courses.length; i++) {
                if (courseName == $scope.selectedStudent.courses[i].name) {
                    return true
                }

            }
            return false;
        }

        //functions that approve to send form
        //
        //new student form
        function readyToSendNewStudentForm() {
            if ($scope.EmailIsGoodNewStudentForm && $scope.PhoneIsGoodNewStudentForm) {
                $scope.readyToAddNewStudentNewStudentForm = true

            }
        }

        //update student form
        function readyToSendNewUpdateForm() {
            if ($scope.EmailIsGoodUpdateForm && $scope.PhoneIsGoodUpdateForm) {
                $scope.submitUpdateForm = true

            }
        }


        //function that start on pafe lioad 
        function onLoad() {
            //check if user is a manger or a student 
            var user = JSON.parse(sessionStorage.user);
            $scope.user = user;
            if (user.role == "manger") {
                $scope.isManger = true;
            } else {
                $scope.isManger = false;
            }


            //ajax call to get all the courses for display 
            $http({
                method: 'GET',
                url: "http://localhost/Project4/php/API.php?command=getAllCourses"
            }).then(function (response) {

                var courses = response.data
                $scope.courses = courses;
            }, function (err) {
                alert("error" + err);
            });

            //ajax call to get all the student for display 
            $http({
                method: 'GET',
                url: "http://localhost/Project4/php/API.php?command=getAllUsers"
            }).then(function (response) {
                var users = response.data;
                //divided the users for manger and student 
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

            }), function (err) {
                alert("error" + err);
            };

        }

        //update function
        $scope.logout = function () {
            sessionStorage.clear();
            $location.path("/logIn")
        }

    })
})();