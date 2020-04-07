const express = require("express");
const cors = require("cors");
const app = express();
//middlewares
app.use(express.json());
app.use(cors());
app.use('/',require('./routes'));

module.exports = app;
