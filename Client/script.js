let books = [];
let drawnBooks = [];
let authors = [];
let selectedAuthor;

window.onload = () => {
	document.querySelector('.authorListItem').style.backgroundColor = '#d8e2dc';
	selectedAuthor = document.querySelector('.authorListItem');
	loadBooksFetch();
	loadAuthors();
}

function addBook(){
	window.location.href += 'add/book';
}

function loadBooksFetch(){
	books =[];
	fetch('/api/books')
		.then(response => response.json())
		.then(data => loadBooks(data))
}

function loadBooks(data){
	const bookList = document.querySelector('#bookList');
	bookList.innerHTML = '';
	for(book of data){
		drawBook(book.title,book.author);
		registerBook(book.title,book.author);
	}
}


function loadAuthors(){
	const list = document.querySelector('#authorList');

	fetch('/api/authors')
		.then(response => response.json())
		.then(data =>{
			const authorsData = data;
			list.innerHTML = '';
			for(author of authorsData){
				let authorEl = document.createElement('div');

				authorEl.innerHTML = `<div class="authorListItem" onclick="getBooksByAuthor(this)" >${author} </div>`;

				list.appendChild(authorEl);
				authors.push(author);
			}
		})
}

function getBooksByAuthor(author){
	if(selectedAuthor){
		selectedAuthor.style.backgroundColor = '#fec5bb';
	}
	author.style.backgroundColor = '#d8e2dc';
	selectedAuthor = author;

	const authorVal = author.innerText;
	const bookList = document.querySelector('#bookList');
	drawnBooks = [];
	bookList.innerHTML = '';
	if(authorVal == 'all'){
		loadBooksFetch();
		return;
	}
	for(book of books){
		const title = book.title;
		const bookAuthor = book.author;
		if(bookAuthor == authorVal){
			drawBook(title,bookAuthor);
		}
	}
}
function registerBook(title,author){
	books.push({title,author});
}
function drawBook(title,author){
	const bookList = document.querySelector('#bookList');

	const newBook = document.createElement('div');
	const titleEl = document.createElement('h2');
	const authorEl = document.createElement('div');

	titleEl.classList.add('title');
	titleEl.innerText = title;

	newBook.appendChild(titleEl);

	authorEl.classList.add('author');
	authorEl.innerText = author;

	newBook.appendChild(authorEl)

	newBook.classList.add('book');
	bookList.appendChild(newBook);
	drawnBooks.push({title,author});
}


