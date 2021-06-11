const express = require('express');
const cors = require('cors');
const server = express();

const books = [];

server.use(cors());
server.use(express.json());
server.use(express.static('D:/bookStoreInfo/Client'));

server.get('/',(req,res) => {
	res.sendFile('D:/bookStoreInfo/BookStore/Client/index.html');
});

server.get('/api/books', (req,res) => {
	res.send(books);
});


server.get('/add/book', (req,res) => {
	res.sendFile('D:/bookStoreInfo/BookStore/Client/addBook/index.html');
});

server.post('/api/add/book', (req,res) => {
	books.push(req.body);
});

server.get('/api/authors',(req,res) => {
	let authors=[];
	let count =0;
	for(book of books){
		for(author of authors){
			if(author != book.author){
				count++;
			}
		}
		if(count == authors.length){
			authors.push(book.author);
		}
		count = 0;
	}
	res.send(authors);
});

server.listen(3000, console.log('Listening to port 3000...'));