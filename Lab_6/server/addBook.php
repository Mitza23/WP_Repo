<?php
    include 'Controller.php';

    $controller = new Controller("", "", "", "");

    $title = $_POST['title'];
    $author = $_POST['author'];
    $genre = $_POST['genre'];
    $pages = $_POST['pages'];

    $success = $controller->addBook($title, $author, $genre, $pages);

    if ($success === TRUE) {
        echo "Book successfully added";
    }
    else {
        echo "Error";
    }