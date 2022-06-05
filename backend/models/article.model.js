module.exports = (sequelize, Sequelize) => {
    const Article = sequelize.define('article', {
        title: {
            type: Sequelize.TEXT
        },
        subtitle: {
            type: Sequelize.TEXT
        },
        content: {
            type: Sequelize.TEXT
        }
    });

    return Article;
}