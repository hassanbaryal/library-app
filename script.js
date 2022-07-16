

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