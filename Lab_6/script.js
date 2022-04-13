
function validAttributes(title, author, genre, pages) {
    if(title === "" || author === "" || genre === "" || pages <= 0) {
        return false;
    }
    return true;
}


function submitForAdd(event) {
    event.preventDefault();

    let title = $("title").val();
    let author = $("author").val();
    let genre = $("genre").val();
    let pages = $("pages").val();

    if(validAttributes(title, author, genre, pages)) {
        $.ajax({
            url:'server/addBook.php',
            type:'post',
            data:{"title":title, "author":author, "genre":genre, "pages":pages},
            success:function (response) {
                if(response === "Book successfully added") {
                    alert("Letsgoo")
                }
                else {
                    alert(response)
                }
            }
        });
    }
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
    let innerHtml = "<table><tr><th>Title</th><th>Author</th><th>Genre</th><th>Pages</th></tr>"

    let booksObj = JSON.parse(data);
    for (let book in booksObj) {
        innerHtml += "<tr>";
        for(let key in book){
            innerHtml += "<td>" + book[key] + "</td>";
        }
        innerHtml += "</tr>";
    }
    innerHtml += "</table>";
    $(innerHtml).appendTo('#books')
}