<?php

function connect() {
    //create connection to the database 
    $connection = mysqli_connect("localhost", "root", "", "College");

//check if connction works 
    if (mysqli_connect_errno($connection)) { // if error return true  
        die("fail to connect" . mysqli_error_list());
    }

//supporting hebrow
    mysqli_set_charset($connection, "utf8");
    return $connection;
}

function delete($sql) {
// Create connection
    $connection = connect();

    if ($connection->query($sql) === TRUE) {
        echo "Record deleted successfully";
    } else {
        echo "Error deleting record: " . $connection->error;
    }
    //close connection
    mysqli_close($connection);
}

function insert($sql) {
// Create connection
    $connection = connect();

    if ($connection->query($sql) === TRUE) {
        $last_id = $connection->insert_id;
        return $last_id;
    } else {
        echo "Error: " . $sql . "<br>" . $connection->error;
    }
    //close connection
    mysqli_close($connection);
}

function getOneObject($sql) {
    // Create connection
    $connection = connect();
    $result = mysqli_query($connection, $sql);
    $obj = mysqli_fetch_object($result);
    mysqli_close($connection);
    return json_encode($obj);
}

function getArray($sql) {
    // Create connection
    $connection = connect();
    $result = mysqli_query($connection, $sql);

    $array = array();
    $obj = mysqli_fetch_object($result);

    while ($obj) {
        $array[] = $obj;
        $obj = mysqli_fetch_object($result);
    }
//close connection
    mysqli_close($connection);
    return json_encode($array);
}
