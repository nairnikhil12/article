module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define('article', {
        title: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.TEXT
        }
    });

    return Article;
}