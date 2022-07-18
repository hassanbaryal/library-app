// FOR DISCERNING BETWEEN NEW AND EDIT BOOK
// when + book is pressed, make header "New Book"
// when edit book is pressed, make header "Edit book"
// both cases, function will check wether header says new or edit
// and perform task based on that

function Book(title, author, readStatus, link, pageCount, rating, description, node) {
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.link = link
    this.pageCount = pageCount
    this.rating = rating
    this.description = description
    this.node = node
}

let library = []

const bookCard = document.querySelector(".book-card").cloneNode(true) //copy empty bookcard template
document.querySelector(".book-card").remove() //remove the empty book card on startup
const addBookBtn = document.getElementById("add-book-btn")
const bookForm = document.getElementById("book-form")
const bookFormHeader = document.querySelector(".form-header")
const bookFormInputs = document.querySelectorAll("#book-form input, .user-input")
const bookFormCloseBtn = document.getElementById("close-new-book")
const bookFormSubmitBtn = document.getElementById("submit-new-book")

addBookBtn.addEventListener("click", () => {
    bookFormHeader.textContent = "New Book"
    bookForm.classList.toggle("open-form")
    addBookBtn.disabled = true
})

bookFormCloseBtn.addEventListener("click", () => {
    bookForm.classList.toggle("open-form")
    addBookBtn.disabled = false
})

bookFormSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (bookForm.checkValidity()) {
        editLibrary()
        console.log("what happened")
    } else {
        alert("Invalid Submission!")
    }
})

function editLibrary() {

    if (bookFormHeader.textContent.includes("New")) {
        library.push(new Book(bookFormInputs[0].value, bookFormInputs[1].value, (bookFormInputs[2].checked ? bookFormInputs[2].value : bookFormInputs[3].value), bookFormInputs[4].value, bookFormInputs[5].value, bookFormInputs[6].value, bookFormInputs[7].value))

        createBookCard(library[library.length - 1])
        bookFormCloseBtn.click()

        // add attribute to Book contructor that points to its own book card using data-attributes
        // use document.querySelector(".book-card").dataset.book to get custom attribute value
    }
}


function createBookCard(book) {
    //clone bookcard into node in book
    //add attributes to the node (e.g. title, autohor, read status, etc.)
    // add data attributes to bookcard and the three buttons
    //
    book.node = bookCard.cloneNode(true)
    
    // Add the data-title attribute to the book-card element
    // and its button descendants
    let bookCardBtns = book.node.querySelectorAll("button")
    book.node.setAttribute("data-title", book.title)
    bookCardBtns[0].setAttribute("data-title", book.title)
    bookCardBtns[1].setAttribute("data-title", book.title)
    bookCardBtns[2].setAttribute("data-title", book.title)

    // Fill out book card with info that user submitted
    book.node.querySelector(".title").innerHTML = book.title
    book.node.querySelector(".authors").innerHTML = book.author
    book.node.querySelector(".read").innerHTML = book.readStatus
    book.node.querySelector(".count").innerHTML = book.pageCount
    book.node.querySelector(".rating-num").innerHTML = book.rating
    book.node.querySelector(".description-content").innerHTML = book.description

    addBookBtn.parentElement.insertBefore(book.node, addBookBtn)
}