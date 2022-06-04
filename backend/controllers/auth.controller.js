const db = require('../models');    
const config = require('../config/auth.config');
const User = db.user;
const { ERROR_MESSAGE } = require('../error_messages/error');

let jwt = require('jsonwebtoken');
let bcrypt = require('bcryptjs');

exports.register = (req, res) => {
    const firstname = req.body.firstname;
    const lastname = req.body.lastname;
    const username = req.body.username;
    const password = req.body.password;

    if(!firstname) {
        return res.status(400).send({
            error_code: 'REGISTER001',
            message: ERROR_MESSAGE['REGISTER001']
        });
    }

    if(!lastname) {
        return res.status(400).send({
            error_code: 'REGISTER002',
            message: ERROR_MESSAGE['REGISTER002']
        });
    }

    if(!username) {
        return res.status(400).send({
            error_code: 'REGISTER003',
            message: ERROR_MESSAGE['REGISTER003']
        });
    }

    if(!password) {
        return res.status(400).send({
            error_code: 'REGISTER004',
            message: ERROR_MESSAGE['REGISTER004']
        });
    }

    User.findOne({
        where: { 'username': username }
    })
    .then(user => {
        if(!user) {
            User.create({
                firstname: req.body.firstname,
                lastname: req.body.lastname,
                username: req.body.username,
                password: bcrypt.hashSync(req.body.password, 8)
            })
            .then(user => {
                res.send({ message: "User registered successfully" });
            })
            .catch(err => {
                res.status(500).send({ 
                    error_code: 'REGISTER005',
                    message: err.message || ERROR_MESSAGE['REGISTER005']
                });
            });
        }
        else {
            return res.status(400).send({
                error_code: 'REGISTER006',
                message: ERROR_MESSAGE['REGISTER006']
            });
        }
    })
};

exports.login = (req, res) => {
    const username = req.body.username;

    if(!username) {
        return res.status(400).send({
            error_code: 'LOGIN001',
            message: ERROR_MESSAGE['LOGIN001']
        });
    }

    User.findOne({
        where: {
            'username': username
        }
    })
    .then(user => {
        if(!user) {
            return res.status(404).send({ 
                error_code: 'LOGIN002',
                message: ERROR_MESSAGE['LOGIN002'] 
            });
        }

        const passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

        if(!passwordIsValid) {
            return res.status(401).send({
                error_code: 'LOGIN003',
                message: ERROR_MESSAGE['LOGIN003'] 
            })
        }

        const token = jwt.sign({ id: user.id }, config.secret, { expiresIn: 864000 })

        res.status(200).send({
            id: user.id,
            username: user.username,
            accessToken: token
        });
    })
    .catch(err => {
        res.status(500).send({ 
            error_code: 'LOGIN004',
            message: err.message | ERROR_MESSAGE['LOGIN004']
        });
    });
};