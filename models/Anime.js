const mongoose = require('mongoose');

const anime = mongoose.Schema({
    name : { type : String, required : true },
    episode : { type : String, required : true },
    studio : { type : String, required : true },
    gender : { type : String, required : true },
    synopsis : { type : String, required : true },
    duration : { type : String, required : true },
    cover : { type : String, required : true }
})

module.exports = mongoose.model('Anime', anime);