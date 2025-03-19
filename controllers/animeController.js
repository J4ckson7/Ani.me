const Anime = require('../models/Anime');

const animeController = {
    addAnime : async function(req, res){
        try {
            const anime = new Anime({
                name : req.body.name,
                episode : req.body.episode,
                studio : req.body.studio,
                gender : req.body.gender,
                synopsis : req.body.synopsis,
                duration : req.body.duration,
                cover : req.file.path
            })
    
            await anime.save()
            res.send('Tudo Ok');
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    },

    searchEditAnime : async function(req, res){
        const { search } = req.body;
        
    }
}

module.exports = animeController;