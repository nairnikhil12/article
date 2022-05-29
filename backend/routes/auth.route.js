const { verifyRegister } = require('../middleware');
const controller = require('../controllers/auth.controller');

module.exports = (app) => {
    app.use((req, res, next) => {
        res.header(
            'Access-Control-Allow-Headers',
            'x-access-token, Origin, Content-type, Accept'
        );
        next();
    });

    app.post('/api/v1/auth/register', [verifyRegister.checkDuplicateUsername], controller.register);
    app.post('/api/v1/auth/login', controller.login);
};