require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const helmet = require("helmet");
const { NODE_ENV } = require('./config')
const app = express();
const AddItemRouter = require('./AddItem/addItem-router')
const AuthRouter = require('./auth/auth-router')
const morganOption = NODE_ENV === "production" ? "tiny" : "common";
const UsersRouter = require('./users/users-router');
app.use(morgan(morganOption));
app.use(helmet());
app.use(cors());

app.use('/api/items', AddItemRouter);
app.use('/api/auth', AuthRouter);
app.use('/api/users', UsersRouter);
app.get("/", (req, res) => {
  res.send("Hello, world!");
});

app.use((error, req, res, next) => {//eslint-disable-line no-unused-vars
  let message;
  if (NODE_ENV === "production") {
    message = { error: { message: "server error" } };
  } else {
    console.error(error);
    message = { message: error.message, error }
  }
  res.status(500).json(message);
});

module.exports = app;
