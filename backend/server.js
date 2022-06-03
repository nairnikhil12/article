const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

let corsOptions = {
    origin: 'http://localhost:8081',
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(express.static('dist/article'));

const db = require('./models');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');

    user1 = {
        firstname: 'Nikhil',
        lastname: 'Nair',
        username: 'abc',
        password: '$2a$08$Y8UU3plqZ8eIMbjRF0wd9.xCadKUx3rRzkJf/h6F3yeQHWE5qeNiC'
    };

    user2 = {
        firstname: 'Hell',
        lastname: 'Girl',
        username: 'xyz',
        password: ''
    };

    article1 = {
        title: 'Anime',
        content: 'Anime ABC XYZ',
        userId: '1'
    };

    article2 = {
        title: 'Game',
        content: 'Game ABC XYZ',
        userId: '1'
    };

    db.user.create(user1);
    db.user.create(user2);

    db.articles.create(article1);
    db.articles.create(article2);
});

require('./routes/auth.route')(app);
require('./routes/article.route')(app);

const PORT = process.env.port || 8081;

// app.get('*', function(req, res) {
//     res.sendFile(path.join(__dirname, '/dist/article/index.html'));
// });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});