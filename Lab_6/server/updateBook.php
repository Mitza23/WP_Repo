<?php
    require 'Controller.php';

    //    $controller = new Controller("", "", "", "");

    $id = $_POST['id'];
    $title = $_POST['title'];
    $author = $_POST['author'];
    $genre = $_POST['genre'];
    $pages = $_POST['pages'];


    $controller->updateBook($id, $title, $author, $genre, $pages);