<?php
    include 'Controller.php';

    $controller = new Controller("", "", "", "");

    $result = $controller->getAll();

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
