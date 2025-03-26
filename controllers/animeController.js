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
            res.redirect('/admin/administracao');
        } catch (error) {
            res.send(error)
            console.log(error)
        }
    },

    searchEditAnime : async function(req, res){
        try {
            let searchResult = await Anime.findOne({ 
                name : req.body.name
            })
            if(!searchResult) return res.send('Anime não encontrado');

            // res.render('edit', { body: { id , name, episode, studio, gender, synopsis, duration} })
            res.redirect(`/admin/edit/${searchResult._id}`);
        } catch (error) {
            console.log(error);
        }
    },

    editAnime : async function(req, res) {
        let name = req.body.name || req.params.name;
        let episode = req.body.episode || req.params.episode;
        let studio = req.body.studio || req.params.studio;
        let gender = req.body.gender || req.params.gender;
        let synopsis = req.body.synopsis || req.params.synopsis;
        let duration = req.body.duration || req.params.duration;
        const id = req.params.id;

        const filter = { _id : id }
        const update = {name, episode , studio , gender , synopsis , duration}

        try {
            let doc = await Anime.findOneAndUpdate(filter, update)
            res.redirect('/admin/administracao')
        } catch (error) {
            res.send(error);
        }
    },

    searchDelAnime : async function(req, res){
        try {
            let searchResult = await Anime.findOne({ 
                name : req.body.name
            })
            if(!searchResult) return res.send('Anime não encontrado');

            res.redirect(`/admin/delete/${searchResult._id}`);
        } catch (error) {
            console.log(error);
        }
    },

    delAnime : async function(req, res) {
        let id = req.params.id

        try {
            if(!id) return id = req.body.id;

            let doc = await Anime.findOneAndDelete({ _id : id })
            res.redirect('/admin/administracao')
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = animeController;