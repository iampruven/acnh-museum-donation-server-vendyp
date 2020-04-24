const knex = require("knex");
const app = require("../src/app");
const UsersService = require("../src/users/users-service");
const cleanTable = require('./util/util')
describe("Auth Router", () => {
  let db;
  before(()=>{
      db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
    
    return cleanTable(db);
  });

  
  
 
  it("Should let user login", (done) => {
  

    const username = "asdasd";
    const password = "aoidjoaidja";

    UsersService.hashPassword(password).then((hashedPwd) => {
      UsersService.insertUser(db, { username, password: hashedPwd }).then(
        () => {
          supertest(app)
            .post("/api/auth/login")
            .send({ username, password})
            .expect(200)
            .end(function(err, res) {
              if (err) done(err);
              expect(res.body.authToken.length).to.be.gt(0);
              done();
            });
        }
      )
      .catch(done);
    }).catch(done);
  });
});
