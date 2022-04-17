<?php
    require 'Controller.php';

    //    $controller = new Controller("", "", "", "");

    $id = $_POST['id'];

    $success = $controller->returnBook($id);
