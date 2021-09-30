const pool = require("../db");
const { Pool } = require("pg");
const customerRouter = require("express").Router();

//create customer
customerRouter.post("/", async (req, res) => {
    try {
        const { name, email_id, balance_amount } = req.body;
        // console.log(req.body);
        const newCustomer = await pool.query(
            "INSERT INTO customer(name, email_id, balance_amount) VALUES($1, $2, $3) RETURNING *",
            [name, email_id, balance_amount]
        );
        console.log(newCustomer);
        res.json(newCustomer.rows[0]);
    } catch (e) {
        console.error(e.message);
    }
});

// get all customer
customerRouter.get("/", async (req, res) => {
    try {
        const allCustomer = await pool.query("SELECT * FROM customer");
        console.log(allCustomer);
        res.json(allCustomer.rows);
    } catch (e) {
        console.error(e.message);
    }
});

//get a customer:id, view a single customer.
customerRouter.get("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const viewCustomer = await pool.query(
            "SELECT * FROM customer WHERE customer_id = $1",
            [id]
        );

        res.json(viewCustomer.rows[0]);
    } catch (e) {
        console.error(e.message);
    }
});

module.exports = customerRouter;
