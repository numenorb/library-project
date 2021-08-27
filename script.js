let myLibrary = [];
let bookTitle = document.querySelector("#book-title");
let authorName = document.querySelector("#author-name");
let pageCount = document.querySelector("#page-count");
let readStatus = document.querySelector("#read-status");
let submitButton = document.querySelector("#submit-button");
let allForms = Array.prototype.slice.call(document.querySelectorAll(".display-form"));
let bookForm = document.querySelector("#book-form");
let libraryDisplay = document.querySelector("#library-table");
let libraryHeaders = document.querySelector("#table-headers");
let newBookButton = document.querySelector("#new-book");
const clearLibraryButton = document.querySelector("#clear-library-button");
let deleteButtons;
let readArray = [];
let deleteArray = [];
let bookCount = myLibrary.length;

submitButton.addEventListener('click', () => {
    addBookToLibrary();
    saveLocalLibrary();
});

newBookButton.addEventListener('click', () => {toggleBookForm();});
clearLibraryButton.addEventListener('click', () =>{
    myLibrary = [];
    updateDisplay(myLibrary);
    localStorage.clear();
})

window.addEventListener('load',  () => {
    if (localStorage.savedBooks){
        myLibrary = JSON.parse(localStorage.getItem("savedBooks") || "[]");
        updateDisplay(myLibrary);
    }
});


function Book(title, author, pageCount, read, bookNumber) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.bookNumber = bookNumber;
}


function addBookToLibrary(){
    let newBook = new Book(bookTitle.value, authorName.value, parseInt(pageCount.value), readStatus.checked, bookCount);
    if(newBook.title.replace(/\s/g,'') == ''){
        alert('Please fill out the title.');
        bookTitle.focus();
        return
    }
    else if(newBook.author.replace(/\s/g,'') == ''){
        alert("Please fill out the author's name.");
        authorName.focus();
        return
    }
    else if(newBook.pageCount == '' || Number.isInteger(newBook.pageCount) === false){
        alert('Page count must be an integer');
        pageCount.focus();
        return
    }
    myLibrary.unshift(newBook);  
    updateDisplay(myLibrary);
    assignDeleteButtons();
    toggleBookForm();
    clearForm(allForms);
    bookCount++;
}

function clearForm(formArray){
    for(forms in formArray){
        formArray[forms].value = '';
    }
}

function createTableRow(title, author, pageCount, read, deleteStatus, bookNumber){
    const tableRow = document.createElement('tr');
    let deleteButton;
    let readButton;
    for(i = 0; i < arguments.length - 3; i++){
        let tableItem = document.createElement('th');
        tableItem.innerText = arguments[i];
        tableRow.appendChild(tableItem);
    }
    let tableReadButton = document.createElement('th');

    if (read === true || read === false){  //creates the read/unread checkbook if read is boolean
        readButton = document.createElement('input');
        readButton.setAttribute('type', 'checkbox');
        readButton.setAttribute('data-read-status-to-change', bookNumber);
        readButton.addEventListener('click', () => changeReadStatus(myLibrary[bookNumber]));
        tableReadButton.append(readButton);
        readButton.checked = read;
        readArray.push(readButton);
    }
    else {                                  //Just puts is the input
        tableReadButton.innerText = read;
    }
    tableRow.append(tableReadButton);

    let tableDeleteButton = document.createElement('th');
    if (deleteStatus === true){
        deleteButton = document.createElement('button');
        deleteButton.setAttribute('data-book_to_remove', bookNumber);
        tableDeleteButton.appendChild(deleteButton);
        deleteButton.innerText = 'Delete';
    } else{
        tableDeleteButton.innerText = 'Delete?';
    }
    tableRow.appendChild(tableDeleteButton);
    libraryDisplay.appendChild(tableRow);
    deleteButtons = document.querySelectorAll('[data-book_to_remove]'); //Creates new list of delete buttons

}

let saveLocalLibrary  = () => {
    localStorage.setItem('savedBooks', JSON.stringify(myLibrary));
}
function updateDisplay(bookList){
    while(libraryDisplay.firstChild){
        libraryDisplay.removeChild(libraryDisplay.firstChild);
    }
    createTableRow("Title", "Author", "Pages", "Read?", false, undefined) //creates headers
    for (let i = 0; i < bookList.length; i++){
        createTableRow(bookList[i].title, bookList[i].author, bookList[i].pageCount, bookList[i].read, true, bookList[i].bookNumber);
    }
}

function toggleBookForm(){
    bookForm.style.display = (bookForm.style.display === 'none' ? 'flex' : 'none')
    bookTitle.focus();
    ;
}
d
function changeReadStatus(bookToChange){
    bookToChange.read = (bookToChange.read ? false : true);
}
function deleteBook(bookToDelete){
    myLibrary.splice(bookToDelete,1);
    updateDisplay(myLibrary);
}

function assignDeleteButtons(){
    for (let b = 0; b < bookCount + 1; b++){ // b for books
        //let bookIndex = myLibrary.findIndex(book => book.bookNumber == b);
        for (let d = 0; d < deleteButtons.length; d++){ //d for delete
            if (deleteButtons[d].getAttribute('data-book_to_remove') == myLibrary[b].bookNumber){
                deleteButtons[d].addEventListener('click', () => {
                    myLibrary.splice(myLibrary.findIndex(book => book.bookNumber == myLibrary[b].bookNumber),1);
                    //findIndex(book => book.bookNumber == b)+1);
                    updateDisplay(myLibrary);
                    assignDeleteButtons();
                })
            }
        }
    }
}
function creatDeleteButton(){

}


//const index = myLibrary.findIndex(book => book.bookNumber == bookData)
// this will return the index of the book to match the delete button.
// every time it updates deisplay, it should call setDeleteButton
// I need to find the book with bookNumber = bookData 
// 1. return the index of book in myLibrary based on its bookNumber
// 2. Loop through the books and then delete buttons.
// 3. If the delete button data-book_to_remove attribute === the bookNumber:
// 4. addEventListener to delete the book in myLibrary in which the index === data-book_to_remove
// 5. Update the display

let newBook = new 
Book(bookTitle.value, authorName.value, parseInt(pageCount.value), readStatus.checked, bookCount);
let fakeBooks = [{title: 'one', author: 'fake', pageCount: 100, read: true},
     {title: 'two', author: 'me', pageCount: 100, read: false}]
function fakeLibrary(){
    let newBook1 = new Book("test", "fake", 3, readStatus.checked, bookCount);
    bookCount++;
    let newBook2 = new Book("also test", "me", 5, readStatus.checked, bookCount);
    bookCount++;
    myLibrary.unshift(newBook1);
    myLibrary.unshift(newBook2);
    updateDisplay(myLibrary);

}