<?php

class Controller
{
    private $connection;
    private $servername;
    private $username;
    private $password;
    private $dbname;

    private $addStmt;
    private $title, $author, $genre, $pages;

    private $updateTitleStmt;
    private $updateAuthorStmt;
    private $updateGenreStmt;
    private $updatePagesStmt;
    private $bookTitle, $newValue;

    private $deleteStmt;

    private $getAllStmt;

    /**
     * @param $servername
     * @param $username
     * @param $password
     * @param $dbname
     */
    public function __construct($servername, $username, $password, $dbname)
    {
//        $this->servername = $servername;
//        $this->username = $username;
//        $this->password = $password;
//        $this->dbname = $dbname;
        $this->servername = "localhost";
        $this->username = "root";
        $this->password = "";
        $this->dbname = "wp_labs";

        $this->prepareStatements();
    }


    public function prepareStatements()
    {
//        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
//        if ($this->connection->connect_error) {
//            die("Connection failed: " . $this->connection->connect_error);
//        }

        $this->connect();

        // Add book
        $this->addStmt = $this->connection->prepare(
            "INSERT INTO Books (title, author, genre, pages)
                   VALUES (?, ?, ?, ?)");
        $this->addStmt->bind_param("sssi", $this->title, $this->author, $this->genre, $this->pages);

        // Update title
        $this->updateTitleStmt = $this->connection->prepare(
            "UPDATE Books SET title=? where title=?"
        );
        $this->updateTitleStmt->bind_param("ss", $this->newValue, $this->bookTitle);

        // Update author
        $this->updateAuthorStmt = $this->connection->prepare(
            "UPDATE Books SET author=? where title=?"
        );
        $this->updateAuthorStmt->bind_param("ss", $this->newValue, $this->bookTitle);

        // Update genre
        $this->updateGenreStmt = $this->connection->prepare(
            "UPDATE Books SET genre=? where title=?"
        );
        $this->updateGenreStmt->bind_param("ss", $this->newValue, $this->bookTitle);

        // Update pages
        $this->updatePagesStmt = $this->connection->prepare(
            "UPDATE Books SET pages=? where title=?"
        );
        $this->updatePagesStmt->bind_param("si", $this->newValue, $this->bookTitle);

        // Delete book
        $this->deleteStmt = $this->connection->prepare(
            "DELETE FROM Books where title=?"
        );
        $this->deleteStmt->bind_param("s", $this->bookTitle);

        $this->getAllStmt = $this->connection->prepare(
            "SELECT * FROM Books"
        );

//        $this->connection->close();

        $this->disconnect();
    }

    private function connect()
    {
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    private function disconnect()
    {
        $this->connection->close();
    }

    public function addBook($title, $author, $genre, $pages)
    {
//        $sqlQuery = "INSERT INTO Books(title, author, genre, pages)" .
//                     "VALUES ('$title', '$author', '$genre', '$pages')";
//
//        if ($this->connection->query($sqlQuery) === TRUE) {
//            echo "New record created successfully";
//        } else {
//            echo "Error: " . $sqlQuery . "<br>" . $this->connection->error;
//
        $this->title = $title;
        $this->author = $author;
        $this->genre = $genre;
        $this->pages = $pages;
        $this->connect();
        $success = $this->addStmt->execute();
        $this->disconnect();
        return $success;
    }

    public function updateTitle($title, $newValue)
    {
//        $updateQuery = "UPDATE Books SET title='$newValue' where title='$title'";
//        if ($this->connection->query($updateQuery) === TRUE) {
//            echo "Record updated successfully";
//        } else {
//            echo "Error updating record: " . $this->connection->error;
//        }
        $this->bookTitle = $title;
        $this->newValue = $newValue;
        $this->connect();
        $this->updateTitleStmt->execute();
        $this->disconnect();
    }

    public function updateAuthor($title, $newValue)
    {
//        $updateQuery = "UPDATE Books SET author='$newValue' where title='$title'";
//        if ($this->connection->query($updateQuery) === TRUE) {
//            echo "Record updated successfully";
//        } else {
//            echo "Error updating record: " . $this->connection->error;
//        }
        $this->bookTitle = $title;
        $this->newValue = $newValue;
        $this->connect();
        $this->updateAuthorStmt->execute();
        $this->disconnect();
    }

    public function updateGenre($title, $newValue)
    {
//        $updateQuery = "UPDATE Books SET genre='$newValue' where title='$title'";
//        if ($this->connection->query($updateQuery) === TRUE) {
//            echo "Record updated successfully";
//        } else {
//            echo "Error updating record: " . $this->connection->error;
//        }
        $this->bookTitle = $title;
        $this->newValue = $newValue;
        $this->connect();
        $this->updateGenreStmt->execute();
        $this->disconnect();
    }

    public function updatePages($title, $newValue)
    {
//        $updateQuery = "UPDATE Books SET pages='$newValue' where title='$title'";
//        if ($this->connection->query($updateQuery) === TRUE) {
//            echo "Record updated successfully";
//        } else {
//            echo "Error updating record: " . $this->connection->error;
//        }
        $this->bookTitle = $title;
        $this->newValue = $newValue;
        $this->connect();
        $this->updatePagesStmt->execute();
        $this->disconnect();
    }

    public function deleteBook($title)
    {
        $this->bookTitle = $title;
        $this->connect();
        $this->deleteStmt->execute();
        $this->disconnect();
    }

    public function getAll()
    {
        $this->connect();
        $result = $this->getAllStmt->execute();
        $this->disconnect();
        return $result;
    }
}