const { ERROR_MESSAGE } = require('../error_messages/error');
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
                error_code: 'REGISTER006',
                message: ERROR_MESSAGE['REGISTER006']
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