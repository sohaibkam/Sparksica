const Pool = require("pg").Pool;
require("dotenv").config();
const pg = require("pg");

pg.types.setTypeParser(1114, function (stringValue) {
    console.log(stringValue);
    return stringValue; //1114 for time without timezone type
});
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false,
    },
});

pool.connect((err, client, release) => {
    if (err) {
        return console.error("Error acquiring client", err.stack);
    }
    client.query("SELECT NOW()", (err, result) => {
        release();
        if (err) {
            return console.error("Error executing query", err.stack);
        }
        console.log(result.rows);
    });
});

module.exports = pool;
