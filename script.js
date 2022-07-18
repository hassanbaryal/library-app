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

        console.log(bookFormInputs[0].value)
        console.log(bookFormInputs[1].value)
        console.log((bookFormInputs[2].checked ? bookFormInputs[2].value : bookFormInputs[3].value))
        console.log(bookFormInputs[4].value)
        console.log(bookFormInputs[5].value)
        console.log(bookFormInputs[6].value)
        console.log(bookFormInputs[7].value)


        // add attribute to Book contructor that points to its own book card using data-attributes
        // use document.querySelector(".book-card").dataset.book to get custom attribute value
    }
}