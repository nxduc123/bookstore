var mongoose = require('mongoose');
// Genre Schema
var genreSchema = mongoose.Schema({
	name:{
		type: String,
		require: true
	},
	create_date:{
		type:Date,
		default: Date.now
	}
});
var Genre = module.exports = mongoose.model('Genre', genreSchema);

//get genres
module.exports.getGenres = function(callback,limit){
	Genre.find(callback).limit(limit);
}

//get genres theo id
module.exports.getGenreById = function(id,callback){
	Genre.findById(id, callback);
}

//add genre
module.exports.addGenre = function(genre,callback){
	Genre.create(genre,callback);
}

//update genre ngon
module.exports.updateGenre = (id, genre, options, callback) => {
	var query = {_id: id};
	var update = {
		name: genre.name
	}
	Genre.findOneAndUpdate(query, update, options, callback);
}


//xoa genre
module.exports.removeGenre = function(id,callback){
	var query = {_id: id};
	Genre.remove(query,callback);
}