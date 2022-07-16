

function Book(name, author, readStatus, link, pageCount, rating, description) {
    this.name = name
    this.author = author
    this.readStatus = readStatus
    this.link = link
    this.pageCount = pageCount
    this.rating = rating
    this.description = description
}

let library = []

const addBookBtn = document.getElementById("add-book-btn")
const bookForm = document.getElementById("book-form")
const bookFormCloseBtn = document.getElementById("close-new-book")
const bookFormSubmitBtn = document.getAnimations("submit-new-book")

addBookBtn.addEventListener("click", () => {
    bookForm.classList.toggle("open-form")
    addBookBtn.disabled = true
})

bookFormCloseBtn.addEventListener("click", () => {
    bookForm.classList.toggle("open-form")
    addBookBtn.disabled = false
})