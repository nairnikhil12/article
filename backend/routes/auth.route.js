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

    app.post('/api/auth/register', [verifyRegister.checkDuplicateUsername], controller.register);
    app.post('/api/auth/login', controller.login);
};