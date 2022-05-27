module.exports = app => {
    const articles = require('../controllers/article.controller.js');
    let router = require('express').Router();

    router.post('/', articles.create);

    app.use('/api/v1/article', router);
};