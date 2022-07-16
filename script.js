

const addBookBtn = document.getElementById("add-book-btn")
const newBookForm = document.getElementById("new-book-info-form")
const newBookFormCloseBtn = document.getElementById("close-new-book")
const newBookFormSubmitBtn = document.getAnimations("submit-new-book")

addBookBtn.addEventListener("click", () => {
    newBookForm.classList.toggle("open-form")
    addBookBtn.disabled = true
})

newBookFormCloseBtn.addEventListener("click", () => {
    newBookForm.classList.toggle("open-form")
    addBookBtn.disabled = false
})