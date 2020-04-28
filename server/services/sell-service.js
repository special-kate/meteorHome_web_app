"use strict";
const mongoose = require("mongoose"),
sell = mongoose.model("sell");

/**
 * fetch all existing sell items
 *
 * @param params
 */
exports.search = params => {
  if(params==undefined){
    const promise = sell.find(params).exec();
    return promise;
  }else{
    let strs = `sell.find()${params}.exec()`;
    const promise = eval(strs);
    return promise;
  }
  
};

/**
 * add a sell item
 *
 * @param sellitem
 */
exports.save = newSell => {
  const sellsaved = new sell(newSell);
  return sellsaved.save();
};

/**
 * update a sell item
 *
 * @param updatedSell
 */
exports.update = updatedSell => {
  const promise = sell.findByIdAndUpdate(
    updatedSell._id,
    updatedSell
  ).exec();
  return promise;
};

/**
 * delete a sell item
 *
 * @param sellId
 */
exports.delete = sellId => {
  const promise = sell.findByIdAndRemove(sellId).exec();
  return promise;
};
