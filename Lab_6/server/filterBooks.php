<?php
    require 'Controller.php';

    //    $controller = new Controller("", "", "", "");

    $query = $_GET['query'];

    $result = $controller->filterBooks($query);

    $echoArray = Array();

    if($result ->num_rows > 0) {
        while ($row = mysqli_fetch_row($result)) {
            $echoArray[] = $row;
        }
    }
    else {
        echo "0 results";
        return;
    }

    echo json_encode($echoArray);