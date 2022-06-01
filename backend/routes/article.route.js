const authJwt = require('../middleware/authJwt');

module.exports = app => {
    const articles = require('../controllers/article.controller.js');
    let router = require('express').Router();

    // Unauthenticated Routes
    router.get('/id/:id', articles.findByArticleId);
    router.get('/all', articles.findAllArticles);

    // Authenticated Routes
    router.post('/', [authJwt.verifyToken], articles.create);
    router.get('/user', [authJwt.verifyToken], articles.findAllArticlesByUserId);

    app.use('/api/v1/article', router);
};