const db = require('../models');
const User = db.user;

checkDuplicateUsername = (req, res, next) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(user => {
        if(user) {
            res.status(400).send({
                message: 'Error: Username already exists.'
            });
            return ;
        }

        next();
    })
};

const verifyRegister = {
    checkDuplicateUsername: checkDuplicateUsername
};

module.exports = verifyRegister;