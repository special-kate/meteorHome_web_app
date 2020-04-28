"use strict";
const sellController = require("../controllers/sell-controller");
module.exports = app => {
  app
    .route("/api/sells")
    .get(sellController.list)
    .post(sellController.save);
  app
    .route("/api/sells/:_id")
    .put(sellController.update)
    .delete(sellController.delete);

};