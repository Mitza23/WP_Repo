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
    private $updateLentStmt;
    private $newValue;

    private $deleteStmt;
    private $bookId;

    private $getAllStmt;


    private $getBookStatusStmt;

    private $filterStmt = "SELECT * from Books WHERE 1=1";


    /**
     * @param $servername
     * @param $username
     * @param $password
     * @param $dbname
     */
    public function __construct($servername, $username, $password, $dbname)
    {
        $this->servername = $servername;
        $this->username = $username;
        $this->password = $password;
        $this->dbname = $dbname;
//        $this->servername = "localhost";
//        $this->username = "root";
//        $this->password = "";
//        $this->dbname = "wp_labs";

    }


    private function connect()
    {
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);
        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
//        else {
//            echo "Connected";
//        }
    }

    private function disconnect()
    {
        $this->connection->close();
    }

    public function addBook($title, $author, $genre, $pages)
    {
        $this->title = $title;
        $this->author = $author;
        $this->genre = $genre;
        $this->pages = $pages;
        $this->connect();

        $this->addStmt = $this->connection->prepare(
            "INSERT INTO Books (title, author, genre, pages)
                   VALUES (?, ?, ?, ?)");
        $this->addStmt->bind_param("sssi", $this->title, $this->author, $this->genre, $this->pages);

        $result = $this->addStmt->execute();

        if ($result === TRUE) {
            echo "Book successfully added";
        } else {
            echo "Error: <br>" . $this->connection->error;

        }
        $this->disconnect();
        return $result;
    }

    public function updateTitle($id, $newValue)
    {
        $this->connect();
        $this->updateTitleStmt = $this->connection->prepare(
            "UPDATE Books SET title=? where book_id=?"
        );
        $this->updateTitleStmt->bind_param("si", $this->newValue, $this->bookId);

        $this->bookId = $id;
        $this->newValue = $newValue;


        $result = $this->updateTitleStmt->execute();
        $this->disconnect();
        return $result;
    }

    public function updateAuthor($id, $newValue)
    {
        $this->bookId = $id;
        $this->newValue = $newValue;
        $this->connect();

        $this->updateAuthorStmt = $this->connection->prepare(
            "UPDATE Books SET author=? where book_id=?"
        );
        $this->updateAuthorStmt->bind_param("si", $this->newValue, $this->bookId);

        $result = $this->updateAuthorStmt->execute();
        $this->disconnect();
        return $result;
    }

    public function updateGenre($id, $newValue)
    {

        $this->bookId = $id;
        $this->newValue = $newValue;
        $this->connect();
        $this->updateGenreStmt = $this->connection->prepare(
            "UPDATE Books SET genre=? where book_id=?"
        );
        $this->updateGenreStmt->bind_param("si", $this->newValue, $this->bookId);
        $result = $this->updateGenreStmt->execute();
        $this->disconnect();
        return $result;
    }

    public function updatePages($id, $newValue)
    {
        $this->bookId = $id;
        $this->newValue = $newValue;
        $this->connect();
        $this->updatePagesStmt = $this->connection->prepare(
            "UPDATE Books SET pages=? where book_id=?"
        );
        $this->updatePagesStmt->bind_param("ii", $this->newValue, $this->bookId);
        $result = $this->updatePagesStmt->execute();
        $this->disconnect();
        return $result;
    }

    public function updateLent($id, $newValue)
    {
        $this->bookId = $id;
        $this->newValue = $newValue;
        $this->connect();
        $this->updateLentStmt = $this->connection->prepare(
            "UPDATE Books SET lent=? where book_id=?"
        );
        $this->updateLentStmt->bind_param("ii", $this->newValue, $this->bookId);
        $result = $this->updateLentStmt->execute();
        $this->disconnect();
        return $result;
    }

    public function updateBook($id, $title, $author, $genre, $pages)
    {
        echo $id;
        echo $title;
        echo $author;
        if ($title != '') {
            $result = $this->updateTitle($id, $title);
        }
        if ($author != '') {
            $result = $this->updateAuthor($id, $author);
        }
        if ($genre != '') {
            $result = $this->updateGenre($id, $genre);
        }
        if ($pages != '') {
            $result = $this->updatePages($id, $pages);
        }

        if ($result === TRUE) {
            echo "Book successfully updated";
        } else {
            echo "Error: <br>" . $this->connection->error;
        }
    }

    public function deleteBook($id)
    {
        $this->bookId = $id;
        $this->connect();

        $this->deleteStmt = $this->connection->prepare(
            "DELETE FROM Books where book_id=?"
        );
        $this->deleteStmt->bind_param("i", $this->bookId);

        $result = $this->deleteStmt->execute();


        if ($result === TRUE) {
            echo "Book successfully deleted";
        } else {
            echo "Error: <br>" . $this->connection->error;
        }

        $this->disconnect();
    }

    public function getAll()
    {
        $this->connect();
        $this->getAllStmt = $this->connection->prepare(
            "SELECT * FROM Books"
        );
        $this->getAllStmt->execute();
        $result = $this->getAllStmt->get_result();

        $this->disconnect();
        return $result;
    }

    public function lendBook($id)
    {
        $this->bookId = $id;
        $this->connect();
        $this->getBookStatusStmt = $this->connection->prepare(
            "SELECT lent FROM Books WHERE book_id=?"
        );
        $this->getBookStatusStmt->bind_param('i', $this->bookId);
        $this->getBookStatusStmt->execute();
        $result = $this->getBookStatusStmt->get_result();
        $row = $result->fetch_assoc();
        $lent = $row['lent'];

        if ($lent == 0) {
            $newValue = 1;
            $result = $this->updateLent($id, $newValue);
            if ($result === true) {
                echo "Book lent successfully";
            } else {
                echo "Error while lending the book";
            }
        } else {
            echo "Book already lent";
        }
    }

    public function returnBook($id)
    {
        $this->bookId = $id;
        $this->connect();
        $this->getBookStatusStmt = $this->connection->prepare(
            "SELECT lent FROM Books WHERE book_id=?"
        );
        $this->getBookStatusStmt->bind_param('i', $this->bookId);
        $this->getBookStatusStmt->execute();
        $result = $this->getBookStatusStmt->get_result();
        $row = $result->fetch_assoc();
//        $row = mysqli_fetch_row($result);
        $lent = $row['lent'];
        if ($lent == 1) {
            $newValue = 0;
            $result = $this->updateLent($id, $newValue);
            if ($result === true) {
                echo "Book returned successfully";
            } else {
                echo "Error while returning the book";
            }
        } else {
            echo "Book already return";
        }
    }

    public function filterBooks($query)
    {
        $this->filterStmt = $this->filterStmt . $query;
//        $this->filterStmt = htmlspecialchars($this->filterStmt);
//        $this->filterStmt = stripslashes($this->filterStmt);
//        $this->filterStmt = trim($this->filterStmt);

        $this->connect();
        $result = $this->connection->query($this->filterStmt);
        $this->disconnect();

        return $result;

    }

    public function resetFilter()
    {
        $this->filterStmt = "SELECT * from Books WHERE 1=1";
        return true;
    }

    public function service()
    {
        if (isset($_GET['action']) && !empty($_GET['action'])) {
            switch ($_GET['action']) {

                case "getAll":
                    $result = $this->getAll();
                    $echoArray = array();

                    if ($result->num_rows > 0) {
                        while ($row = mysqli_fetch_row($result)) {
                            $echoArray[] = $row;
                        }
                    } else {
                        echo "0 results";
                        return;
                    }

                    echo json_encode($echoArray);
                    break;

                case "filterBooks":
                    $query = $_GET['query'];

                    $result = this->filterBooks($query);

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

                    break;
            }
        }
        else if (isset($_POST['action']) && !empty($_POST['action'])) {
            switch ($_POST['action']) {
                case "addBook":
                    $title = $_POST['title'];
                    $author = $_POST['author'];
                    $genre = $_POST['genre'];
                    $pages = $_POST['pages'];

                    $this->addBook($title, $author, $genre, $pages);
                    break;

                case "deleteBook":
                    $id = $_POST['id'];

                    $this->deleteBook($id);
                    break;

                case "updateBook":
                    $id = $_POST['id'];
                    $title = $_POST['title'];
                    $author = $_POST['author'];
                    $genre = $_POST['genre'];
                    $pages = $_POST['pages'];

                    $this->updateBook($id, $title, $author, $genre, $pages);
                    break;

                case "lendBook":
                    $id = $_POST['id'];

                    $this->lendBook($id);
                    break;

                case "returnBook":
                    $id = $_POST['id'];

                    $this->returnBook($id);
                    break;

                case "resetFilter":
                    $this.$this->resetFilter();
                    break;
            }
        }
    }
}

$controller = new Controller("localhost", "root", "", "wp_labs");
$controller->service();
