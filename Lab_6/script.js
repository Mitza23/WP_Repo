
function validAttributes(title, author, genre, pages) {
    if(title === "" || author === "" || genre === "" || pages <= 0) {
        return false;
    }
    return true;
}


function submitForReturn(event) {
    event.preventDefault();

    let id = $("#idReturn").val();
    // console.log(id)
    if(id !== null) {
        $.ajax({
            url:'server/returnBook.php',
            type:'post',
            data:{"id":id},
            success:function (response) {
                if(response === "Book returned successfully") {
                    alert("Book returned successfully")
                }
                else {
                    alert(response)
                }
            }
        })
    }
}


function submitForLending(event) {
    event.preventDefault();

    let id = $("#id").val();
    // console.log(id)
    if(id !== null) {
        $.ajax({
            url:'server/lendBook.php',
            type:'post',
            data:{"id":id},
            success:function (response) {
                if(response === "Book lent successfully") {
                    alert("Book lent successfully")
                }
                else {
                    alert(response)
                }
            }
        })
    }
}


function submitForUpdate(event) {
    event.preventDefault();

    let id = $('#id').val();
    let title = $("#title").val();
    let author = $("#author").val();
    let genre = $("#genre").val();
    let pages = $("#pages").val();

    console.log("Values: " + title + " " + author)
    if(author == null){
        console.log("NULL")
    }
    if(id != null) {
        $.ajax({
            url:'server/updateBook.php',
            type:'post',
            data:{"id":id, "title":title, "author":author, "genre":genre, "pages":pages},
            success:function (response) {
                if(response === "Book successfully updated") {
                    alert("Book successfully updated")
                }
                else {
                    alert(response)
                }
            }
        });
    }
}

function submitForDelete(event) {
    event.preventDefault();

    let id = $("#id").val();
    // console.log(id)
    if(id !== null) {
        $.ajax({
            url:'server/deleteBook.php',
            type:'post',
            data:{"id":id},
            success:function (response) {
                if(response === "Book successfully deleted") {
                    alert("Book successfully deleted")
                }
                else {
                    alert(response)
                }
            }
        })
    }
}

function submitForAdd(event) {
    event.preventDefault();

    let title = $("#title").val();
    let author = $("#author").val();
    let genre = $("#genre").val();
    let pages = $("#pages").val();

    // console.log(title + " " + author)
    if(validAttributes(title, author, genre, pages)) {
        $.ajax({
            url:'server/addBook.php',
            type:'post',
            data:{"title":title, "author":author, "genre":genre, "pages":pages},
            success:function (response) {
                if(response === "Book successfully added") {
                    alert("Book successfully added")
                }
                else {
                    alert(response)
                }
            }
        });
    }
}

let filterQuery = ''

function filterBooks(event) {
    event.preventDefault();

    let attribute = $("#attribute").val();
    let value = $("#value").val();

    attribute = attribute.trim();
    value = value.trim();


    const attributes = ["id", "title", "author", "genre", "pages"]
    if(attributes.includes(attribute)) {
        if(attribute === 'id') {
            filterQuery += " AND " + attribute + "=" + value;
        }
        else if (attribute === 'pages') {
            filterQuery += " AND " + attribute + "<" + value;
        }
        else {
            filterQuery += " AND " + attribute + " LIKE \'%" + value + "%\'";
        }
        $.ajax({
            url:'server/filterBooks.php',
            type:'get',
            data:{"query":filterQuery},
            success:function (data) {
                // console.log(data)
                if(data !== "0 results") {
                    emptyBooks();
                    showBooks(data);
                }
                else {
                    alert("No results")
                }
            }
        });
    }
    else {
        alert("Invalid attribute");
    }
}

function resetFilter(event) {
    filterQuery = ''
    $.ajax({
        url:'server/resetFilter.php',
        type:'post',
        success:function (response) {
            if(response === "Filter reset successfully") {
                alert(response)
            }
            else {
                alert("Error: " + response)
            }
        }
    });
}

function getBooks(event) {
    $.ajax({
        url:'server/getBooks.php',
        type: 'get',
        success:function (data) {
            if(data !== "0 results") {
                emptyBooks();
                showBooks(data);
            }
            else {
                alert("No results")
            }
        }
    })
}

function emptyBooks() {
    $('#books').empty();
}

function showBooks(data) {
    // console.log(data)
    let innerHtml = "<table><tr><th>ID</th><th>Title</th><th>Author</th><th>Genre</th><th>Pages</th><th>Lent</th></tr>"
    let booksObj = JSON.parse(data);

    // console.log(booksObj);

    for (let book of booksObj) {
        innerHtml += "<tr>";
        for(let key in book){
            innerHtml += "<td>" + book[key] + "</td>";
        }
        innerHtml += "</tr>";
    }
    innerHtml += "</table>";
    $(innerHtml).appendTo('#books')
}