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
let readArray = [];
let deleteArray = [];
let bookCount = 0;
submitButton.addEventListener('click', () => {addBookToLibrary();});
newBookButton.addEventListener('click', () => {toggleBookForm();});

function Book(title, author, pageCount, read, bookNumber) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
    this.bookNumber = bookNumber;
}


function addBookToLibrary(){
    let newBook = new Book(bookTitle.value, authorName.value, parseInt(pageCount.value), readStatus.checked, bookCount);
    if(newBook.title == ''){
        alert('Please fill out the title.');
        bookTitle.focus();
        return
    }
    else if(newBook.author == ''){
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
    toggleBookForm();
    clearForm(allForms);
    bookCount++;
}

function clearForm(formArray){
    for(forms in formArray){
        formArray[forms].value = '';
    }
}

function createTableRow(title, author, pageCount, read, deleteStatus){
    const tableRow = document.createElement('tr');
    let deleteButton;
    let readButton;
    for(i = 0; i < arguments.length - 2; i++){
        let tableItem = document.createElement('th');
        tableItem.innerText = arguments[i];
        tableRow.appendChild(tableItem);
    }
    let tableButton = document.createElement('th');

    if (read === true || read === false){
        readButton = document.createElement('input');
        readButton.setAttribute('type', 'checkbox');
        readButton.setAttribute('data-read-status-to-change', bookCount)
        readButton.addEventListener('click', () => changeReadStatus(myLibrary[bookCount-1]));
        tableButton.append(readButton);
        readButton.checked = read;
        readArray.push(readButton);
    }
    else {
        tableButton.innerText = "Read?";
    }
    tableRow.append(tableButton)
    let tableButton2 = document.createElement('th');
    if (deleteStatus === true){
        deleteButton = document.createElement('button');
        tableButton2.appendChild(deleteButton);
        deleteButton.innerText = 'Delete';
    } else{
        tableButton2.innerText = 'Delete?';
    }
    tableRow.appendChild(tableButton2);
    libraryDisplay.appendChild(tableRow);
}


function updateDisplay(bookList){
    while(libraryDisplay.firstChild){
        libraryDisplay.removeChild(libraryDisplay.firstChild);
    }
    createTableRow("Title", "Author", "Pages", "Read", false) //creates headers
    for (let i = 0; i < bookList.length; i++){
        createTableRow(bookList[i].title, bookList[i].author, bookList[i].pageCount, bookList[i].read, true);
    }
}

function toggleBookForm(){
    bookForm.style.display = (bookForm.style.display === 'none' ? 'flex' : 'none');
}

function changeReadStatus(bookToChange){
    bookToChange.read = (bookToChange.read ? false : true);
}
function deleteBook(bookToDelete){

}
/**
 * A 'New Book' button that brings up a form allowing user to input the details of the book: author, title, # pages, read or not?
 * include a 'remove' button on each book's display -- HINT: need to associate your DOM element with the actual book objects: data attribute that corresponds to the index of the library array
 * include a 'read' button that will toggle the read status 
 * 
 * string literal to test form: 
 * console.log(`T: ${bookTitle.value} A: ${authorName.value} p: ${pageCount.value} r: ${readStatus.value}`)
 * 
 * To-Do
 * *** data validation on form: not empty, pages must be number
 * *** make the delete button work: should remove from array
 * ******* when creating the book, add an attribute to the book and the button, the delete button targets that
 * 
 * Challenge:
 * because we haven't learned to actually store anything, if the page is refreshed, all the books disappear. 
 * Try using web storage API to save data on the user's computer.
 * Set up a function that saves the whole library array to localStorage every time a new book is created/deleted/status changes.
 * Create a fucntion that looks for the array locally when the page is first loaded
*/