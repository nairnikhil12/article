const db = require('../models/index.js');
const Article = db.articles;

exports.create = (req, res) => {
    if(!req.body.title) {
        res.status(400).send({
            error_code: 'ARTICLE001',
            message: 'Title can not be empty!'
        });

        return ;
    }

    if(!req.body.content) {
        res.status(400).send({
            error_code: 'ARTICLE002',
            message: 'Content can not be empty!'
        });

        return ;
    }

    const article = {
        title: req.body.title,
        content: req.body.content,
        userId: req.userId
    }

    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                error_code: 'DB001',
                message: err.message || "Database Error."
            });
        });
};

exports.findByArticleId = (req, res) => {
    if(!req.params.id) {
        res.status(400).send({
            error_code: 'ARTICLE003',
            message: 'Article ID not given.'
        });
    }

    Article.findByPk(req.params.id)
        .then(data => {
            if(data) {
                res.send(data);
            }
            else {
                res.status(404).send({
                    error_code: 'ARTICLE004',
                    message: 'Cannot find article with given ID.'
                });
            }
        })
        .catch(err => {
            res.status(500).send({
                error_code: 'DB001',
                message: err.message || 'Database Error.'
            });
        });
};

exports.findAllArticlesByUserId = (req, res) => {
    const userId = req.userId;

    Article.findAll({
        where: { 'userId': userId }
    })
    .then(data => {
        if(data)
            res.status(200).send(data);
        else {
            res.status(404).send({
                error_code: 'ARTICLE004',
                message: 'Some error occured.'
            })
        }
    })
    .catch(err => {
        res.status(500).send({
            error_code: 'DB001',
            message: err.message || 'Database Error.'
        });
    });
};

exports.findAllArticles = (req, res) => {
    console.log("SDF");
    Article.findAll()
        .then(data => {
            if(data)
                res.status(200).send(data);
            else {
                res.status(404).send({
                    error_code: 'ARTICLE004',
                    message: 'Some error occured.'
                })
            }
        })
        .catch(err => {
            res.status(500).send({
                error_code: 'DB001',
                message: err.message || 'Database Error.'
            });
        })
};

