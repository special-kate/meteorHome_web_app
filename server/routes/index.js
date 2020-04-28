"use strict";

const rentRoute = require("./rent-route");
const sellRoute = require("./sell-route");
const usersearchRoute = require("./user-route");


module.exports = app => {
  rentRoute(app);
  sellRoute(app);
  usersearchRoute(app);
};
