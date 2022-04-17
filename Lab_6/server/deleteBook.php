<?php
    require 'Controller.php';

//    $controller = new Controller("", "", "", "");

    $id = $_POST['id'];

    $success = $controller->deleteBook($id);

//    if ($success === TRUE) {
//        echo "Book successfully added";
//    }
//    else {
//        echo "Error";
//    }