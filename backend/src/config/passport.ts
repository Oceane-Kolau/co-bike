import { UserInterface, PublicUserInterface } from "../interface/UserInterface";
import passport from "passport";
import User from "../model/UserModel";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
require("dotenv").config();

const LocalStrategy  = require("passport-local").Strategy;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const StravaStrategy = require('passport-strava').Strategy;

module.exports = function (passport: any) {
  passport.serializeUser(function (user: UserInterface, done: any) {
    done(null, user.id);
  });

  passport.deserializeUser((id: string, done: any) => {
    User.findOne({ _id: id }, (err: Error, user: UserInterface) => {
      const userInformation: PublicUserInterface = {
        username: user.username,
        email: user.email,
        isAdmin: user.isAdmin,
        googleId: user.googleId,
        id: user.id,
      };
      done(err, userInformation);
    });
  });

  passport.use(
    new LocalStrategy({
      usernameField: 'email',
      passwordField: 'password'
    },
      function (email: string, password: string, done: any) {
      User.findOne(
        { email: email },
        (err: boolean, user: UserInterface) => {
          if (err) throw err;
          if (!user) return done(null, false);
          bcrypt.compare(password, user.password, (err, result: boolean) => {
            if (err) throw err;
            if (result === true) {
              return done(null, user);
            } else {
              return done(null, false);
            }
          });
        },
      );
    }),
  );

  passport.use(
    new GoogleStrategy(
      {
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/google/callback`,
      },
      function (accessToken: any, refreshToken: any, profile: any, done: any) {
        process.nextTick(function () {
          User.findOne(
            { googleId: profile.id },
            function (err: Error, user: UserInterface) {
              if (err) throw err;
              if (user) {
                return done(null, user);
              } else {
                const newUser = new User({
                  googleId: profile.id,
                  token: accessToken,
                  username: profile.displayName,
                  email: profile.emails[0].value,
                });
                newUser.save(function (err) {
                  if (err) throw err;
                  return done(null, newUser);
                });
              }
            },
          );
        });
      },
    ),
  );

  passport.use(new StravaStrategy({
    clientID: `${process.env.STRAVA_CLIENT_ID}`,
    clientSecret: `${process.env.STRAVA_CLIENT_SECRET}`,
    callbackURL: `http://${process.env.HOST}:${process.env.PORT}/auth/strava/callback`
  },
  
    function (accessToken: any, refreshToken: any, profile: any, done: any) {
      process.nextTick(function () {
        User.findOne(
          { stravaId: profile.id },
          function (err: Error, user: UserInterface) {
            if (err) throw err;
            if (user) {
              return done(null, user);
            } else {
              const newUser = new User({
                stravaId: profile.id,
                token: accessToken,
                username: profile.displayName,
                email: profile.emails[0].value,
              });
              newUser.save(function (err) {
                if (err) throw err;
                return done(null, newUser);
              });
            }
          },
        );
      });
    },
  ));
};
