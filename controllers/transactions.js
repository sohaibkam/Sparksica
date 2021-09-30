const pool = require("../db");
const { Pool } = require("pg");
const transactionRouter = require("express").Router();

//Gets Transaction History.
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
        const { from, to, transfer_amount } = req.body;

        const fromCustomer = await pool.query(
            `SELECT * FROM customer WHERE email_id='${from}';`
        );
        const toCustomer = await pool.query(
            `SELECT * FROM customer WHERE email_id='${to}';`
        );
        console.log(fromCustomer);
        if (fromCustomer.rows[0].balance_amount < transfer_amount) {
            throw "insufficient Balance.";
        }

        //UPDATING SENDER BALANCE
        const updatedFromBalance =
            Number(fromCustomer.rows[0].balance_amount) - transfer_amount;
        const updateFromCustomer = await pool.query(`UPDATE customer
        SET balance_amount=${updatedFromBalance}
        WHERE email_id='${from}'`);

        //UPDATING RECEIVER BALANCE
        const updateToBalance =
            transfer_amount + Number(toCustomer.rows[0].balance_amount);
        const updateToCustomer = await pool.query(`UPDATE customer
        SET balance_amount=${updateToBalance}
        WHERE email_id='${to}'`);

        //INSERTING INTO TRANSACTIONS TABLE
        const getTime = await pool.query(`SELECT CURRENT_TIMESTAMP;`);
        console.log(getTime.rows[0].current_timestamp);
        const insertTransactions = await pool.query(
            "INSERT INTO transactions(tfrom, tto, transfer_amount, transfer_time) VALUES($1, $2, $3, $4)",
            [from, to, transfer_amount, getTime.rows[0].current_timestamp]
        );

        console.log("insert into transactions", insertTransactions);
        res.status(201).end();
    } catch (e) {
        console.error(e);
        res.status(400).json(e);
    }
});
//Check-transfer, List of Customer and Transactions to be updated.
module.exports = transactionRouter;
