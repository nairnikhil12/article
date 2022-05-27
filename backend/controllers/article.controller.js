const db = require('../models/index.js');
const Article = db.articles;
const Op = db.Sequelize.Op;

exports.create = (req, res) => {
    console.log(req);
    if(!req.body.title) {
        res.status(400).send({
            message: 'Title can not be empty!'
        });

        return ;
    }

    if(!req.body.content) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });

        return ;
    }

    const article = {
        title: req.body.title,
        content: req.body.content
    }

    Article.create(article)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: err.message || "Database Error."
            });
        });
};

exports.findAll = (req, res) => {

};

exports.findById = (req, res) => {

};
