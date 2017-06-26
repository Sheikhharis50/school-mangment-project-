<?php

require_once 'DAL.php';

//logIn Page
function getOneUser($email, $password) {
    $sql = "SELECT `user_id`, `firstName`, `lastName`, `password`, `phone`, `email`, `role`, `imageFileText` FROM `users` WHERE email = '$email' AND password = '$password'";
    echo getOneObject($sql);
}

function getOneUserForgatPassword($firstName, $lastName, $email, $phone) {
    $sql = "SELECT * FROM `users` WHERE `firstName`='$firstName' AND `lastName`='$lastName' AND `phone`='$phone' AND`email` = '$email'";
    echo getOneObject($sql);
}

function updateUserPassword($user_id, $password) {
    $sql = "UPDATE `users` SET `password`='$password' WHERE `user_id` ='$user_id'";
    return insert($sql);
}

//school page
function getAllCourses() {
    $sql = "SELECT * FROM `course` ";
    echo getArray($sql);
}

function getAllUsers() {
    $sql = "SELECT * FROM `users`";
    echo getArray($sql);
}

function getAllStudentCourses($userID) {
    $sql = "SELECT  course.name , course.imageFileName
            FROM studentcourses
            INNER JOIN course
            ON studentcourses.coueseID = course.course_id 
            AND studentID = '$userID'";
    echo getArray($sql);
}

function getAllStudentInCourse($courseID) {
    $sql = "SELECT users.firstName , users.lastName , users.user_id,users.phone ,users.imageFileText
            FROM `studentcourses`
            INNER JOIN users 
            ON users.user_id = studentID
            AND studentcourses.coueseID = $courseID";
    echo getArray($sql);
}

function AddUser($firstName, $lastName, $password, $phone, $email, $role, $imageFileText) {

    $sql = "INSERT INTO `users`(`firstName`, `lastName`, `password`, `phone`, `email`, `role`, `imageFileText`) VALUES ('$firstName','$lastName','$password','$phone','$email','$role','$imageFileText')";
    return insert($sql);
}


function AddNewCourse($name, $description, $imageFileName) {
    $sql = "INSERT INTO `course`(`name`, `description`, `imageFileName`) VALUES ('$name','$description','$imageFileName')";

    return insert($sql);
}

function AddCourseToStudent($courseID, $studentID) {
    $sql = "INSERT INTO `studentcourses`(`coueseID`, `studentID`) VALUES ('$courseID' , '$studentID')";
    insert($sql);
}

function uploadFileCourse($name) {
    $target_dir = "../image/courses/";
    $target_file = pathinfo(basename($_FILES["file"]["name"]));
    $fileName = $target_dir . $name . "." . $target_file['extension'];
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $fileName)) {
        return $name . "." . $target_file['extension'];
    } else {
        return "noImage.png";
    }
}

function uploadFileUser($name) {
    $target_dir = "../image/users/";
    $target_file = pathinfo(basename($_FILES["file"]["name"]));
    $fileName = $target_dir . $name . "." . $target_file['extension'];
    if (move_uploaded_file($_FILES["file"]["tmp_name"], $fileName)) {
        return $name . "." . $target_file['extension'];
    } else {
        return "noImage.png";
    }
}

function deleteCourse($cours_id) {
    $sql = "DELETE FROM `course` WHERE `course_id` = $cours_id";
    delete($sql);
}

function deleteCourseForUser($uesr_id) {
    $sql = "DELETE FROM `studentcourses` WHERE `studentID`=$uesr_id";
    delete($sql);
}

function deleteUser($user_id) {
    $sql = "DELETE FROM `users` WHERE `user_id` = $user_id";
    delete($sql);
}

function UpdateCourse($course_id, $name, $description, $imageFile) {
    if ($imageFile != "noImage.png") {
        $sql = "UPDATE `course` SET `name`='$name',`description`='$description',`imageFileName`='$imageFile' WHERE `course_id`=$course_id";
    } else {
        $sql = "UPDATE `course` SET `name`='$name',`description`='$description' WHERE `course_id`=$course_id";
    }
    return insert($sql);
}

function UpdateUser($user_ID, $firstName, $lastName, $phone, $email, $role, $imageFile) {
    if ($imageFile != "noImage.png") {
        $sql = "UPDATE `users` SET `firstName`='$firstName',`lastName`='$lastName',`phone`='$phone',`email`='$email',`role`='$role',imageFileText='$imageFile' WHERE `user_id`=$user_ID";
    } else {
        $sql = "UPDATE `users` SET `firstName`='$firstName',`lastName`='$lastName',`phone`='$phone',`email`='$email',`role`='$role' WHERE `user_id`=$user_ID";
    }
    return insert($sql);
}

//function that remove javascript code or HTML tags 
function takeJSAndHTMLRemove($text) {
    $pattern = '/\<script.*\<\/script\>/iU';
    $text = preg_replace($pattern, '', $text);
    $text = strip_tags($text);
    return $text;
}