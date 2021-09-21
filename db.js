const Pool = require("pg").Pool;

const pool = new Pool({
    user: "postgres",
    password: "kuzuri",
    host: "localhost",
    port: 5432,
    database: "sparksica",
});

pool.connect((err, client, release) => {
    if (err) {
      return console.error('Error acquiring client', err.stack)
    }
    client.query('SELECT NOW()', (err, result) => {
      release()
      if (err) {
        return console.error('Error executing query', err.stack)
      }
      console.log(result.rows)
    })
  })

module.exports = pool;
