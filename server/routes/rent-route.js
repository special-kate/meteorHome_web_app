"use strict";
const rentController = require("../controllers/rent-controller");
module.exports = app => {
  app
    .route("/api/rents")
    .get(rentController.list)
    .post(rentController.save);
  app
    .route("/api/rents/:_id")
    .put(rentController.update)
    .delete(rentController.delete);

};
