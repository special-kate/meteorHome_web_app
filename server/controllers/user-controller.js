'use strict';

const userService = require('../services/user-servce');
const jwt = require('jsonwebtoken');
/**
* login
 * @param request
 * @param response
*/
exports.login = async (request, response) => {
    //const idQuery = request.body.Id;
    // const params = {};
    // if (idQuery) {
    //     params.Id = idQuery;
    // } 
    const user = request.body
    const u = await userService.search({ account: user.account });
    if (!u) {
        return response.status(404).send({ msg: `Account dose not exsit!` })
    }
    if (user.password !== u.password) {
        return response.status(404).send({ msg: `password is not correct!` })
    }

    const payload = { user: u };
    const options = { expiresIn: '2d', issuer: 'issuer' };
    const secret = "123123";
    const token = jwt.sign(payload, secret, options);

    return response.status(200).send({ token, msg: "logged in" })


    // const result = (users) => {
    //     response.status(200);
    //     response.json(users);
    // };
    // promise.then(result)
    //     .catch(renderErrorResponse(response));
};


/**
 * creates a user
 *
 * @param request
 * @param response
 */
exports.save = async (request, response) => {
    const user = Object.assign({}, request.body);
    const u = await userService.search({ account: user.account })
    // console.log(u);
    if (u)
        return response.status(409).send({ msg: `Account already exist` })

    if (!user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return response.status(400).send({ msg: `Invalid Email format` })

    if (!user.phone.match(/^\d{10}$/))
        return response.status(400).send({ msg: `Invalid Phone No. format` })

    if (user.firstname.lengnth === 0 || user.lastname.lengnth === 0)
        return response.status(400).send({ msg: `Invalid paramters format` })
    if (user.balance<0)
        return response.status(400).send({ msg: `Balance need to be larger than 0 ` })

    const result = (savedUser) => {
        response.status(201);
        response.json(savedUser);
    };
    const promise = userService.save(user);
    promise.then(result)
        .catch(renderErrorResponse(response));
};

/**
 * return todo response
 *
 * @param request
 * @param response
 * */
exports.get = (request, response) => {
    const userId = request.params.id;
    const result = (user) => {
        response.status(200);
        response.json(user);
    };
    const promise = userService.get(userId);
    promise.then(result)
        .catch(renderErrorResponse(response));
};

exports.updatebyid = async (request, response) => {
    const id = request.params.id;
    const updateduser = Object.assign({}, request.body);
    const user = Object.assign({}, request.body);
    const u = await userService.search({ account: user.account })
    // console.log(u);
    // if (u)
    //     return response.status(409).send({ msg: `Account already exist` })

    if (!user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return response.status(400).send({ msg: `Invalid Email format` })

    if (!user.phone.match(/^\d{10}$/))
        return response.status(400).send({ msg: `Invalid Phone No. format` })

    if (user.firstname.lengnth === 0 || user.lastname.lengnth === 0)
        return response.status(400).send({ msg: `Invalid paramters format` })
    if (user.balance<0)
        return response.status(400).send({ msg: `Balance need to be larger than 0 ` })
    updateduser.id = id;
    const result = user => {
        response.status(200);
        response.json({ message: "Successfully Updated." });
    };
    const promise = userService.update(updateduser);
    promise.then(result).catch(renderErrorResponse(response));
}

/**
 * updates the todo resource
 *
 * @param request
 * @param response
 * */
exports.update = (request, response) => {
    const user = request.body;
    
    //console.log(request.body)
   //const u = await userService.search({ account: user.account })
    // console.log(u);
    // if (u)
    //     return response.status(409).send({ msg: `Account already exist` })

    if (!user.email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/))
        return response.status(400).send({ msg: `Invalid Email format` })

    if (!user.phone.match(/^\d{10}$/))
        return response.status(400).send({ msg: `Invalid Phone No. format` })

    if (user.firstname.lengnth === 0 || user.lastname.lengnth === 0)
        return response.status(400).send({ msg: `Invalid paramters format` })

    const updatedUser = Object.assign({}, request.body);
    updatedUser.id = request.decoded.user._id;
    //updatedUser.modifiedDate = Date.now();
    const result = (data) => {
        // console.log(data)
        response.status(200);
        response.json(data);
    };
    const promise = userService.update(updatedUser);
    promise.then(result)
        .catch(renderErrorResponse(response));
};


/**
 * delete an order response
 *
 * @param request
 * @param response
 * */
exports.delete = (request, response) => {
    const userId = request.params.id;
    const result = (user) => {
        response.status(200);
        response.json({
            message: "Successfully Deleted."
        });
    };
    const promise = userService.delete(userId);
    promise.then(result)
        .catch(renderErrorResponse(response));
};

exports.me = async (request, response) => {
    const user = request.decoded.user;
    const u = await userService.search({ account: user.account })
    return response.status(200).send({ data: u, msg: "" });
};

/**
 * throws error if error object is present
 *
 * @param {Response} response the response object
 * @return {Function} the error handler function
 * */
let renderErrorResponse = (response) => {
    const errorCallback = (error) => {
        if (error) {
            response.status(500);
            response.json({
                message: error.message
            });
        }
    }
    return errorCallback;
};
