
function Book(title, author, readStatus, link, pageCount, rating, description, node) {
    this.title = title
    this.author = author
    this.readStatus = readStatus
    this.link = link
    this.pageCount = pageCount
    this.rating = rating
    this.description = description
    this.node = node
    this.removeNode = function () {
        this.node.remove()
    }
}

let library = []
let index = 0

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
    toggleButtons(0)
})

bookFormCloseBtn.addEventListener("click", () => {
    bookForm.classList.toggle("open-form")
    toggleButtons(1)
})

bookFormSubmitBtn.addEventListener("click", (e) => {
    e.preventDefault()
    if (bookForm.checkValidity()) {
        editLibrary()
        toggleButtons(1)
    } else {
        alert("Invalid Submission!")
    }
})

function editLibrary() {

    if (bookFormHeader.textContent.includes("New")) {
        // Create new book in library
        library.push(new Book(bookFormInputs[0].value, bookFormInputs[1].value, (bookFormInputs[2].checked ? bookFormInputs[2].value : bookFormInputs[3].value), bookFormInputs[4].value, bookFormInputs[5].value, bookFormInputs[6].value, bookFormInputs[7].value))
        createBookCard(library[library.length - 1])
    } else {
        // Update book details in library
        library[index].title = bookFormInputs[0].value
        library[index].author = bookFormInputs[1].value
        library[index].readStatus = (bookFormInputs[2].checked ? bookFormInputs[2].value : bookFormInputs[3].value)
        library[index].link = bookFormInputs[4].value
        library[index].pageCount = bookFormInputs[5].value
        library[index].rating = bookFormInputs[6].value
        library[index].description = bookFormInputs[7].value
        editBookCard(library[index])
    }

    bookFormCloseBtn.click()
}


function createBookCard(book) {
    // Clone book card template to book
    book.node = bookCard.cloneNode(true)
    
    // Add the data-title attribute to the book-card element
    // and its button descendants
    let bookCardBtns = book.node.querySelectorAll("button")
    book.node.setAttribute("data-title", book.title)
    bookCardBtns[0].setAttribute("data-title", book.title)
    bookCardBtns[1].setAttribute("data-title", book.title)
    bookCardBtns[2].setAttribute("data-title", book.title)

    // Fill out book card with info that user submitted
    book.node.querySelector(".title").textContent = book.title
    book.node.querySelector(".authors").textContent = book.author
    book.node.querySelector(".read").textContent = book.readStatus
    book.node.querySelector(".count").textContent = book.pageCount
    book.node.querySelector(".rating-num").textContent = book.rating
    book.node.querySelector(".description-content").textContent = book.description

    // Add href tag to title, if available
    if (!(book.link === "")) {
        book.node.querySelector(".title").setAttribute("href", book.link)
    }

    // Add book card to page
    addBookBtn.parentElement.insertBefore(book.node, addBookBtn)

    // Add listener to bookcard buttons
    bookCardBtns[0].addEventListener("click", (e) => {changeReadStatus(e.target.parentElement)}) // Change read status
    bookCardBtns[1].addEventListener("click", (e) => { // Edit book card details
        
        let i = 0;
        for (i = 0; i < library.length; i++) {
            if (library[i].node.dataset.title === e.target.parentElement.dataset.title) {
                break
            }
        }
        index = i
        bookFormHeader.textContent = "Edit Book"
        fillOutEditForm(library[i])
        toggleButtons(0)
        bookForm.classList.toggle("open-form")
        addBookBtn.disabled = true
    })
    bookCardBtns[2].addEventListener("click", (e) => {removeBook(e.target.parentElement)}) // Delete book and book card
}

function editBookCard (book) {
    // Fill out book card with info that user submitted
    book.node.querySelector(".title").textContent = book.title
    book.node.querySelector(".authors").textContent = book.author
    book.node.querySelector(".read").textContent = book.readStatus
    book.node.querySelector(".count").textContent = book.pageCount
    book.node.querySelector(".rating-num").textContent = book.rating
    book.node.querySelector(".description-content").textContent = book.description

    // Add href tag to title, if available
    if (!(book.link === "")) {
        book.node.querySelector(".title").setAttribute("href", book.link)
    } else {
        book.node.querySelector(".title").removeAttribute("href")
    }
}

// Fills out the edit form with available book info
function fillOutEditForm (book) {
    bookFormInputs[0].value = book.title
    bookFormInputs[1].value = book.author;
    (book.readStatus === "Read") ? (bookFormInputs[2].checked = true) : (bookFormInputs[3].checked = true)
    bookFormInputs[4].value = book.link
    bookFormInputs[5].value = book.pageCount
    bookFormInputs[6].value = book.rating
    bookFormInputs[7].value = book.description
}


// Changes the read status of targetted book
function changeReadStatus (e) {
    let i = 0;
    for (i = 0; i < library.length; i++) {
        if (library[i].node.dataset.title === e.dataset.title) {
            break
        }
    }

    if (library[i].readStatus === "Read") {
        library[i].readStatus = "Not yet read"
        library[i].node.querySelector(".read").textContent = "Not yet read"
    } else {
        library[i].readStatus = "Read"
        library[i].node.querySelector(".read").textContent = "Read"
    }
}

// Deletes targetted book card from page and removes from library array
function removeBook (e) {
    let i = 0;
    for (i = 0; i < library.length; i++) {
        if (library[i].node.dataset.title === e.dataset.title) {
            break
        }
    }
    library[i].removeNode()
    library.splice(i, 1)
}

function toggleButtons (x) {
    let bookCardBtns = library.map(book => book.node.querySelectorAll("button"))

    if (x === 1) {
        bookCardBtns.forEach(book => {
            book.forEach(btn => btn.disabled = false)
        })
        addBookBtn.disabled = false
    } else {
        bookCardBtns.forEach(book => {
            book.forEach(btn => btn.disabled = true)
        })
        addBookBtn.disabled = true
    }
}