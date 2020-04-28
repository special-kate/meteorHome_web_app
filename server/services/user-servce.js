'use strict';
const mongoose = require('mongoose'),
    ObjectID = require('mongodb').ObjectID,
    usersearch = mongoose.model('usersearch');

/**
 * returns a promise for search results
 *
 * @param search param
 * */
exports.search = function(params) {
    const promise = usersearch.findOne(params).exec();
    return promise;
}

/**
 * save the new todo object
 *
 * @param user
 * */
exports.save = (user) => {
    const newUser = new usersearch(user);
    return newUser.save();
};


/**
 * returns the todo object by id
 *
 * @param userId
 * */
exports.get = (userId) => {
    const orderPromise = usersearch.findById(userId).exec();
    return orderPromise;
}

/**
 * updates an existing todo
 *
 * @param updatedUser
 * */
exports.update = (updatedUser) => {
    // console.log(updatedUser)
    // updatedUser.date
    const promise = usersearch.findByIdAndUpdate(
        updatedUser.id, updatedUser
    ).exec();
    return promise;
};


/**
 * deletes an existing todo
 *
 * @param userId
 * */
exports.delete = (userId) => {
    const promise = usersearch.findByIdAndRemove(
        { _id: userId }
    ).exec();
    return promise;
}