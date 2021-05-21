import mongoose from "mongoose";
import express, { Request, Response } from "express";
import cors from "cors";
import passport from "passport";
import cookieParser from "cookie-parser";
import session from "express-session";
import dotenv from "dotenv";
mongoose.set("debug", true);
require("dotenv").config();

// database
mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}/${process.env.DB_DATABASE}`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    autoIndex: true,
  },
  (err: Error) => {
    if (err) throw err;
    console.log("connected to db");
  },
);

// Middleware
const app = express();

const bodyParser = require("body-parser");
//read the request
app.use(express.json());
app.use(
  cors({ origin: `http://${process.env.API_CREDENTIALS}`, credentials: true }),
);
//pass a config object to session initialization
app.use(
  session({
    secret: "secretcode",
    resave: true,
    saveUninitialized: true,
  }),
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());

require("./src/config/passport")(passport);

const routes = require("./src/routing/router");

app.get("/failed", (req, res) => res.send("You Failed to log in!"));
app.use(routes);

app.listen(`${process.env.PORT}`, () => {
  console.log(
    `Server running at http://${process.env.HOST}:${process.env.PORT}`,
  );
});
