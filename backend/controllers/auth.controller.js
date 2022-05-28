const db = require('../models');    
const config = require('../config/auth.config');
const User = db.user;

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    User.create({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        username: req.body.username,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            res.send({ message: "User registered successfully"});
        })
        .catch(err => {
            res.status(500).send({ message: err.message });
        });
};

exports.login = (req, res) => {
    User.findone({
        where: {
            'username': req.body.username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ message: 'User Not Found' });
        }

        let passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid) {
            return res.status(401).send({
                accessToken: null,
                message: 'Invalid Password!'
            })
        }

        let token = jwt.sign({ id: userId }, config.secret, { expiresIn: 864000 })

        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ message: err.message });
    });
};