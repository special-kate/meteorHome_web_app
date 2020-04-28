"use strict";

const sellService = require("../services/sell-service");

/**
 * GET:search all/search by query
 *
 * @param request
 * @param response
 */
exports.list = (request, response) => {
  let Querys = request.query;
  let params = {};
  if (Object.keys(Querys).length!=0) {
    params = Querys;
  }
  let params_fmt = '';
  let k1,k2,k3,k4,k5,k6,v1,v2,v3,v4,v5,v6;
  if (params.location!=undefined){
    k1 = 'home_description.location';
    v1 = params.location;
    let q = `.where('${k1}').equals('${v1}')`;
    params_fmt += q;
  }
  if (params.grossarea!=undefined){
    k2 = 'home_description.area';
    let v2a = params.grossarea.split(",")[0],
    v2b = params.grossarea.split(",")[1]
    let q = `.where('${k2}').gte(${v2a}).lte(${v2b})`;
    params_fmt += q;
  }
  if (params.price!=undefined){
    k3 = 'home_description.price';
    let v3a = params.price.split("-")[0],
    v3b = params.price.split("-")[1];
    let q = `.where('${k3}').gte(${v3a}).lte(${v3b})`;
    params_fmt += q;
  }
  if (params.home_type!=undefined){
    k4 = 'home_description.home_type';
    v4 = params.home_type;
    let q = `.where('${k4}').equals('${v4}')`;
    params_fmt += q;
  }
  if (params.bedroom_no!=undefined){
    k5 = 'home_description.bedroom_no';
    v5 = params.bedroom_no;
    let q = `.where('${k5}').equals(${v5})`;
    params_fmt += q;
  }
  if (params.bathroom_no!=undefined){
    k6 = 'home_description.bathroom_no';
    v6 = params.bathroom_no;
    let q = `.where('${k6}').equals(${v6})`;
    params_fmt += q;
  }
  // search all
  if (params_fmt==''){
    const promise = sellService.search();
    const result = sell => {
      response.status(200);
      response.json(sell);
    };
    promise.then(result).catch(renderErrorResponse(response));
  // search by condition
  }else{
    const promise = sellService.search(params_fmt);
    const result = sell => {
      response.status(200);
      response.json(sell);
    };
    promise.then(result).catch(renderErrorResponse(response));
  }
  
};


/**
 * Add a sell item and sets the response.
 *
 * @param request
 * @param response
 */
exports.save = (request, response) => {
  const sell = Object.assign({}, request.body);
  const result = savedSell => {
    response.status(201);
    response.json(savedSell);
  };
  const promise = sellService.save(sell);
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * update a sell item
 *
 * @param request
 * @param response
 */
exports.update = (request, response) => {
  const sellId = request.params._id;
  const updatedsell = Object.assign({}, request.body);
  updatedsell._id = sellId;
  const result = sell => {
    response.status(200);
    response.json({ message: "Successfully Updated." });
  };
  const promise = sellService.update(updatedsell);
  promise.then(result).catch(renderErrorResponse(response));
};

/**
 * delete a sell item
 *
 * @param request
 * @param response
 */
exports.delete = (request, response) => {
  const sellId = request.params._id;
  const result = () => {
    response.status(200);
    response.json({ message: "Successfully Deleted." });
  };
  const promise = sellService.delete(sellId);
  promise.then(result).catch(renderErrorResponse({ message: "Deleted Failed" }));
};

/**
 * Throws error if error object is present.
 *
 * @param {Response} response The response object
 * @return {Function} The error handler function.
 */
let renderErrorResponse = response => {
  const errorCallback = error => {
    if (error) {
      response.status(500);
      response.json({
        message: error.message
      });
    }
  };
  return errorCallback;
};
