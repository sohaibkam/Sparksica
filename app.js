const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");
const { Pool } = require("pg");
const customerRouter = require("./controllers/customer");
const transactionRouter = require("./controllers/transactions");

//MIDDLEWARE//
app.use(cors());
app.use(express.json()); //to support JSON-encoded bodies , req.body

//ROUTES//
app.use("/customer", customerRouter);
app.use("/transactions", transactionRouter);

module.exports = app;
