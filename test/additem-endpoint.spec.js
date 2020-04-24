const knex = require("knex");
const app = require("../src/app");
const UsersService = require("../src/users/users-service");
const AuthService = require("../src/auth/auth-service");
const cleanTable = require("./util/util");

describe("AddItem Endpoint", () => {
  let db;
  let authToken;

  before("make knex instance", async () => {
    db = knex({
      client: "pg",
      connection: process.env.TEST_DB_URL,
    });
    app.set("db", db);
    await cleanTable(db);
    const username = "asdasd";
    const password = "aoidjoaidja";

    const hashedPwd = await UsersService.hashPassword(password);
    const user = await UsersService.insertUser(db, {
      username,
      password: hashedPwd,
    });
    console.log("user is ", user);
    const payload = { user_id: user.id };
    authToken = AuthService.createJWT(username, payload);
    console.log("This is the auth token", authToken);
  });

  after("disconnect from db", () => db.destroy());

  it("GET gets the all the items", async () => {
    await supertest(app)
      .post("/api/items")
      .send({ name: "Tuna", date: "03/22/2020" })
      .set("Authorization", "bearer " + authToken);
    return supertest(app)
      .get("/api/items")
      .set("Authorization", "bearer " + authToken)
      .expect(200);
  });

  it("POST create an item", () => {
    return supertest(app)
      .post("/api/items")
      .send({ name: "Tiger butterfly", date: "04/02/2020" })
      .set("Authorization", "bearer " + authToken)
      .expect(201);
  });
  it("DELETE selected item", async () => {
    const response = await supertest(app)
      .post("/api/items")
      .send({ name: "Amber", date: "03/22/2020" })
      .set("Authorization", "bearer " + authToken);

    expect(response.status).to.equal(201)
    
    return supertest(app)
      .delete(`/api/items/${response.body.id}`)
      .set("Authorization", "bearer " + authToken)
      .expect(204);
  });
});
