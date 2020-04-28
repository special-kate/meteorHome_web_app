"use strict";
const mongoose = require("mongoose"),
rent = mongoose.model("rent");

/**
 * fetch all existing rent items
 *
 * @param params
 */
exports.search = params => {
  if(params==undefined){
    const promise = rent.find(params).exec();
    return promise;
  }else{
    let strs = `rent.find()${params}.exec()`;
    const promise = eval(strs);
    return promise;
  }
  
};

/**
 * add a rent item
 *
 * @param rentitem
 */
exports.save = newRent => {
  const rentsaved = new rent(newRent);
  return rentsaved.save();
};

/**
 * update a rent item
 *
 * @param updatedRent
 */
exports.update = updatedRent => {
  const promise = rent.findByIdAndUpdate(
    updatedRent._id,
    updatedRent
  ).exec();
  return promise;
};

/**
 * delete a rent item
 *
 * @param rentId
 */
exports.delete = rentId => {
  const promise = rent.findByIdAndRemove(rentId).exec();
  return promise;
};
