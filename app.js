var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

app.use(express.static(__dirname+'/client'));

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }));
Genre = require('./models/genre');
Book = require('./models/book');

mongoose.connect('mongodb://localhost/bookstore');
var db = mongoose.connection;

app.get('/',function(req, res){
	res.send('Please use /api/book or hi /api');
});

app.get('/api/genres', function(req, res){
	Genre.getGenres(function(err, genres){
		if(err){
			throw err;
		}
		res.json(genres);
	});

});

//Thêm Grenres
app.post('/api/genres', function(req, res){
	var genre = req.body;
	Genre.addGenre(genre,function(err, genre){
		if(err){
			throw err;
		}
		res.json(genre);
	});

});


//lay danh sach GENRE theo ID
//app.get('/api/books/:_id', (req, res) => {
//	Genre.getGenreById(req.params._id, (err, genre) => {
//		if(err){
//			throw err;
//		}
//		res.json(genre);
//	});
//});


app.put('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	var genre = req.body;
	Genre.updateGenre(id, genre, {}, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});


// lay danh sach book
app.get('/api/books', function(req, res){
	Book.getBooks(function(err, books){
		if(err){
			throw err;
		}
		res.json(books);
	});

});

//lay danh sach book theo id
app.get('/api/books/:_id', (req, res) => {
	Book.getBookById(req.params._id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//them book
app.post('/api/books', (req, res) => {
	var book = req.body;
	Book.addBook(book, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});
//Update book
app.put('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	var book = req.body;
	Book.updateBook(id, book, {}, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});

//Xoa Genre
app.delete('/api/genres/:_id', (req, res) => {
	var id = req.params._id;
	Genre.removeGenre(id, (err, genre) => {
		if(err){
			throw err;
		}
		res.json(genre);
	});
});
//xoa book

app.delete('/api/books/:_id', (req, res) => {
	var id = req.params._id;
	Book.removeBook(id, (err, book) => {
		if(err){
			throw err;
		}
		res.json(book);
	});
});


app.listen(9999);
console.log('Running on port 9999....');