const authJwt = require('../middleware/authJwt');

module.exports = app => {
    const articles = require('../controllers/article.controller.js');
    let router = require('express').Router();

    router.post('/', [authJwt.verifyToken], articles.create);
    router.get('/:id', [authJwt.verifyToken], articles.findByArticleId);
    router.get('/:userId', [authJwt.verifyToken], articles.findAllArticlesByUserId);

    app.use('/api/v1/article', router);
};