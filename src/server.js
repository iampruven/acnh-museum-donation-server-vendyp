const knex = require("knex");
const app = require("./app");
const { PORT, DATABASE_URL } = require("./config");

const parse = require('pg-connection-string').parse;
const pgconfig = parse(DATABASE_URL);
pgconfig.ssl = { rejectUnauthorized: false };

const db = knex({
  client: "pg",
  connection: pgconfig,
});
db.raw('select 1').then(r => {
  console.log("Connection successful")
}).catch(err => {
  console.error('FAILED TO CONNECT TO DATABASE')
  console.error(err)
})
console.log(DATABASE_URL)

app.set("db", db);

app.listen(PORT, () => {
  console.log(`Server listening at http://localhost:${PORT}`);
});
