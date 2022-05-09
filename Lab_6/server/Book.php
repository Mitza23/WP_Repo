<?php

class Book implements JsonSerializable
{
    private $id;
    private $title;
    private $author;
    private $pages;
    private $genre;
    private $lent;

    public function __construct($title, $author, $genre, $pages, $id=0, $lent=false)
    {
        $this->title = $title;
        $this->author = $author;
        $this->pages = $pages;
        $this->genre = $genre;
        $this->lent = $lent;
        $this->id = $id;
    }

    public function lend()
    {
        if ($this->lent == false)
        {
            $this->lent = true;
            return true;
        }
        else
        {
            return false;
        }
    }

    public function __toString()
    {
        return $this->title . " by: " . $this->author . " of genre: " . $this->genre .  " having: " . $this->pages
            . " pages";
    }

    /**
     * @return mixed
     */
    public function getTitle()
    {
        return $this->title;
    }

    /**
     * @param mixed $title
     */
    public function setTitle($title)
    {
        $this->title = $title;
    }

    /**
     * @return mixed
     */
    public function getAuthor()
    {
        return $this->author;
    }

    /**
     * @param mixed $author
     */
    public function setAuthor($author)
    {
        $this->author = $author;
    }

    /**
     * @return mixed
     */
    public function getPages()
    {
        return $this->pages;
    }

    /**
     * @param mixed $pages
     */
    public function setPages($pages)
    {
        $this->pages = $pages;
    }

    /**
     * @return mixed
     */
    public function getGenre()
    {
        return $this->genre;
    }

    /**
     * @param mixed $genre
     */
    public function setGenre($genre)
    {
        $this->genre = $genre;
    }

    /**
     * @return false
     */
    public function getLent()
    {
        return $this->lent;
    }

    /**
     * @param false $lent
     */
    public function setLent($lent)
    {
        $this->lent = $lent;
    }

    public function jsonSerialize(): mixed
    {
        return [
            'id' => $this->id,
            'title' => $this->title,
            'author' => $this->author,
            'genre' => $this->genre,
            'pages' => $this->pages,
            'lent' => $this->lent
        ];
    }
}
