let myLibrary = [];
let bookTitle = document.querySelector("#book-title");
let authorName = document.querySelector("#author-name");
let pageCount = document.querySelector("#page-count");
let readStatus = document.querySelector("#read-status");
let submitButton = document.querySelector("#submit-button");
let allForms = document.querySelectorAll(".display-form");
let libraryDisplay = document.querySelector("#library-table");
let libraryHeaders = document.querySelector("#table-headers");

submitButton.addEventListener('click', () => {addBookToLibrary();});


function Book(title, author, pageCount, read) {
    this.title = title;
    this.author = author;
    this.pageCount = pageCount;
    this.read = read;
}


function addBookToLibrary(){
    let newBook = new Book(bookTitle.value, authorName.value, pageCount.value, readStatus.checked);
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
    else if(newBook.pageCount == ''){
        alert('Please fill out the page count');
        pageCount.focus();
        return
    }
    myLibrary.unshift(newBook);  
    updateDisplay(myLibrary);
    clearForm();
}

function clearForm(){
    let formArray = Array.from(allForms);
    for(forms in formArray){
        formArray[forms].value = '';
    }
}

function createTableRow(title, author, pageCount, read, deleteStatus){
    const tableRow = document.createElement('tr');
    let deleteButton;
    for(i = 0; i < arguments.length - 1; i++){
        let tableItem = document.createElement('th');
        tableItem.innerText = arguments[i];
        tableRow.appendChild(tableItem);
    }
    if (deleteStatus === true ?
        deleteButton = document.createElement('button') :
        deleteButton = document.createElement('th'))
    deleteButton.innerText = 'Delete';
    tableRow.appendChild(deleteButton);
    libraryDisplay.appendChild(tableRow);
}
// 8.22 - need to fix this. Need to reach readStatus.checked 


function updateDisplay(bookList){
    while(libraryDisplay.firstChild){
        libraryDisplay.removeChild(libraryDisplay.firstChild);
    }
    createTableRow("Title", "Author", "Pages", "Read", false)
    for (let i = 0; i < bookList.length; i++){
        let readTheBook = (bookList[i].read ? "Read" : "Unread")
        createTableRow(bookList[i].title, bookList[i].author, bookList[i].pageCount, readTheBook, true);
    }
}





/**
 * All books are going to be scored into the myLibrary array
 * addBookToLibrary() should loop through the array and display each book on the page.
 * *** This could be in some sort of table, or each on their own 'card'
 * *** Manually add a few to begin to get the layout/display
 * A 'New Book' button that brings up a form allowing user to input the details of the book: author, title, # pages, read or not?
 * include a 'remove' button on each book's display -- HINT: need to associate your DOM element with the actual book objects: data attribute that corresponds to the index of the library array
 * include a 'read' button that will toggle the read status 
 * 
 * string literal to test form: 
 * console.log(`T: ${bookTitle.value} A: ${authorName.value} p: ${pageCount.value} r: ${readStatus.value}`)
 * 
 * 
 * Challenge:
 * beuase we haven't learned to actually store anything, if the page is refreshed, all the books disappear. 
 * Try using web storage API to save data on the user's computer.
 * Set up a function that saves the whole library array to localStorage every time a new book is created/deleted/status changes.
 * Create a fucntion that looks for the array locally when the page is first loaded
*/