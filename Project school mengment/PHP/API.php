<?php

require_once 'BL.php';

$command = $_REQUEST["command"];

switch ($command) {

    //logIn page
    case "getOneUser":
        $email = $_GET["email"];
        $password = hash('ripemd160', $_GET["password"]);
        getOneUser($email, $password);
        break;

    case "getOneUserForgatPassword":
        $firstName = $_GET["firstName"];
        $lastName = $_GET["lastName"];
        $email = $_GET["email"];
        $phone = $_GET["phone"];
        getOneUserForgatPassword($firstName, $lastName, $email, $phone);
        break;

    case "updateUserPassword":
        $user_id = $_GET["user_id"];
        $password = hash('ripemd160', $_GET["password"]);
        updateUserPassword($user_id, $password);
        break;

    //scholl page
    case "getAllCourses":
        getAllCourses();
        break;

    case "getAllUsers":
        getAllUsers();
        break;

    case "getAllStudentCoursesAndInfromtion":
        $userID = $_GET["user_ID"];
        getAllStudentCourses($userID);
        break;

    case "getAllStudentInCourse":
        $courseID = $_GET["courseID"];
        getAllStudentInCourse($courseID);
        break;

    case "insertNewStudent":

        $firstName = takeJSAndHTMLRemove($_POST["firstName"]);
        $lastName = takeJSAndHTMLRemove($_POST["lastName"]);
        $email = takeJSAndHTMLRemove($_POST["email"]);
        $phone = takeJSAndHTMLRemove($_POST["phone"]);
        $password = hash('ripemd160', $_POST["password"]);
        $role = "student";
        $imageFile = uploadFileUser($email);
        $userID = AddUser($firstName, $lastName, $password, $phone, $email, $role, $imageFile);

        if (!empty($_POST['check_list'])) {
            foreach ($_POST['check_list'] as $courseID) {
                AddCourseToStudent($courseID, $userID);
            }
        }
        header("Location: http://localhost/Project4/index.php#!/school");
        break;

    case "insertNewCourse" :

        $name = takeJSAndHTMLRemove($_POST["name"]);
        $description = takeJSAndHTMLRemove($_POST["description"]);
        $imageFile = uploadFileCourse($name);
        AddNewCourse($name, $description, $imageFile);

        header("Location: http://localhost/Project4/index.php#!/school");
        break;

    case "updateStudent":

        $user_id = $_POST["user_id"];
        $firstName = takeJSAndHTMLRemove($_POST["firstName"]);
        $lastName = takeJSAndHTMLRemove($_POST["lastName"]);
        $email = takeJSAndHTMLRemove($_POST["email"]);
        $phone = takeJSAndHTMLRemove($_POST["phone"]);
        $role = "student";
        $imageFile = uploadFileUser($email);
        UpdateUser($user_id, $firstName, $lastName, $phone, $email, $role, $imageFile);
        deleteCourseForUser($user_id);

        if (!empty($_POST['check_list'])) {
            foreach ($_POST['check_list'] as $courseID) {
                AddCourseToStudent($courseID, $user_id);
            }
        }
        header("Location: http://localhost/Project4/index.php#!/school");
        break;

    case "updateCourse" :

        $course_id = $_POST["course_id"];
        $name = takeJSAndHTMLRemove($_POST["name"]);
        $description = takeJSAndHTMLRemove($_POST["description"]);
        $imageFile = uploadFileCourse($name);
        UpdateCourse($course_id, $name, $description, $imageFile);

        header("Location: http://localhost/Project4/index.php#!/school");
        break;

    case "deleteCourse":
        $course_id = $_GET["course_id"];
        deleteCourse($course_id);
        break;

    case "deleteUser":
        $user_id = $_GET["user_id"];
        deleteUser($user_id);
        break;

    //administration page
    case "insertNewManger" :
        $firstName = takeJSAndHTMLRemove($_POST["firstName"]);
        $lastName = takeJSAndHTMLRemove($_POST["lastName"]);
        $email = takeJSAndHTMLRemove($_POST["email"]);
        $phone = takeJSAndHTMLRemove($_POST["phone"]);
        $password = hash('ripemd160', $_POST["password"]);
        $role = "manger";
        $imageFile = uploadFileUser($email);
        AddUser($firstName, $lastName, $password, $phone, $email, $role, $imageFile);

        header("Location: http://localhost/Project4/index.php#!/administration");
        break;


    case "updateManger" :
        $user_id = $_POST["user_id"];
        $firstName = takeJSAndHTMLRemove($_POST["firstName"]);
        $lastName = takeJSAndHTMLRemove($_POST["lastName"]);
        $email = takeJSAndHTMLRemove($_POST["email"]);
        $phone = takeJSAndHTMLRemove($_POST["phone"]);
        $role = "manger";
        $imageFile = uploadFileUser($email);
        UpdateUser($user_id, $firstName, $lastName, $phone, $email, $role, $imageFile);
        header("Location: http://localhost/Project4/index.php#!/administration");


        break;
}

