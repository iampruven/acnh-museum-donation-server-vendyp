const knex = require("knex");
const app = require("../src/app");
const cleanTable = require('./util/util')

describe('Users endpoint', ()=>{

    let db;
    before(()=>{
        db = knex({
        client: "pg",
        connection: process.env.TEST_DB_URL,
      });
      app.set("db", db);
      
      return cleanTable(db);
    });

    it('POST to create a user',()=>{
        return supertest(app)
            .post('/api/users')
            .send({username:"chocolatepudding", password: "1234$5Cp"})
            .expect(201)

    });
});