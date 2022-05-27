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
});

app.get('/', (req, res) => {
    res.json({ message: 'Hello, World!'})
});

require('./routes/article.route')(app);

const PORT = process.env.port || 8081;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});