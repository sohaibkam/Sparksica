const pool = require("../db");
const { Pool } = require("pg");
const transactionRouter = require("express").Router();

transactionRouter.get("/", async (req, res) => {
    try {
        const allTransactions = await pool.query("SELECT * FROM transactions");
        res.json(allTransactions.rows);
    } catch (e) {
        console.error(e.message);
    }
});

//post create transaction, from one customer- email to another email -balance +-.
//From customer - transferAmount, NewBalance for Sender, Update the value.
//To Customer + transferAmount, NewBalance for Receiver, Update the value.
transactionRouter.post("/", async (req, res) => {
    try {
        const {} = req.body;
        const newTransactions = await pool.query("");
    } catch (e) {
        console.error(e.message);
    }
});
//Check-transfer, List of Customer and Transactions to be updated.
module.exports = transactionRouter;
