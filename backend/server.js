const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();

let corsOptions = {
    origin: 'http://localhost:8081'
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const db = require('./models');
db.sequelize.sync({ force: true }).then(() => {
    console.log('Drop and re-sync db.');

    user = {
        firstname: 'Nikhil',
        lastname: 'Nair',
        username: 'abc',
        password: '$2a$08$Y8UU3plqZ8eIMbjRF0wd9.xCadKUx3rRzkJf/h6F3yeQHWE5qeNiC'
    }
    db.user.create(user);
});

require('./routes/auth.route')(app);
require('./routes/article.route')(app);

const PORT = process.env.port || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});