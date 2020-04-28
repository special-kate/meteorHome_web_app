// require libs
let express = require("express"),
  app = express(),
  port = process.env.PORT || 3000,
  mongoose = require("mongoose"),
  bodyParser = require("body-parser"),
  path = require("path");
  cors = require("cors")

// connect to DB
mongoose.connect("mongodb://localhost:27017/meteorhome", {useUnifiedTopology: true,useNewUrlParser: true });
mongoose.Promise = global.Promise;
mongoose.set("useFindAndModify", false);

// middlewares
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(express.static(path.join(__dirname, 'dist')));
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods","*")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-With,Content-Type,Accept"
  );
  next();
});
app.use(cors());

// start
const initApp = require("./app");
initApp(app);
app.listen(port, () => console.log(`start at ${port}`));
