
require('dotenv').config();

const Pool = require("pg").Pool;

const USER = process.env.user;
const PASSWORD = process.env.password; 

const pool = new Pool({
  user: USER,
  password: PASSWORD,
  host: "localhost",
  port: 5432,
  database: "quizname_db",
});
module.exports = pool;
