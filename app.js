const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { Pool } = require("pg");
const customerRouter = require("./controllers/customer");
const transactionRouter = require("./controllers/transactions");

//MIDDLEWARE//
app.use(express.static("./build"));
app.use(cors());
app.use(express.json()); //to support JSON-encoded bodies , req.body

//ROUTES//
app.use("/api/customer", customerRouter);
app.use("/api/transactions", transactionRouter);

module.exports = app;
