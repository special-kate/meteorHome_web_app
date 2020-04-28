'use strict';

const controller = require('../controllers/user-controller');
const validateToken = require('../utils/utils').validateToken;
module.exports = (app) => {

    app.route('/login')
        .post(controller.login);

    app.route('/signup/new')
        .post(controller.save);

    app.route('/me').get(validateToken, controller.me)

    app.route('/user').put(validateToken, controller.update)
    
    app.route('/user/:id')
    .get(controller.get)
    .put(controller.updatebyid)
};