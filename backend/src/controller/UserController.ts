import User from "../model/UserModel";
import express, { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { UserInterface, PublicUserInterface } from "../interface/UserInterface";
import passport from "passport";

module.exports = {
  register: async (req: Request, res: Response): Promise<void> => {
    const { username, password, email } = req?.body;
    if (
      !username ||
      !email ||
      !password ||
      typeof username !== "string" ||
      typeof email !== "string" ||
      typeof password !== "string"
    ) {
      res.send("invalid values");
      return;
    }

    User.findOne({ email }, async (err: Error, doc: UserInterface) => {
      if (err) throw err;
      if (doc) res.send("user exists");
      if (!doc) {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          email,
          username,
          password: hashedPassword,
        });
        await newUser.save();
        res.status(200).send("success");
      }
    });
  },

  login: (req: Request, res: Response) => {
    passport.authenticate("local", (err, user) => {
      if (err) throw err;
      if (!user) res.send("no User exists");
      else {
        req.logIn(user, (err) => {
          if (err) throw err;
          res.status(200).send("success");
        });
      }
    })(req, res);
  },

  logout: (req: Request, res: Response) => {
    req.logout();
    res.status(200).send("success");
  },

  // allow to use context to display user everywhere in react app
  getUser: (req: Request, res: Response) => {
    res.send(req.user);
  },

  getAllUsers: async (req: Request, res: Response) => {
    await User.find({}, (err: Error, data: UserInterface[]) => {
      if (err) throw err;
      const filteredUsers: PublicUserInterface[] = [];
      data.forEach((el: UserInterface) => {
        const userInformation = {
          id: el.id,
          username: el.username,
          isAdmin: el.isAdmin,
          email: el.email,
        };
        filteredUsers.push(userInformation);
      });
      res.send(filteredUsers);
    });
  },

  deleteOneUser: async (req: Request, res: Response) => {
    const id = req.body.id;
    try {
      const user = await User.findByIdAndDelete(id);
      if (!user) return res.sendStatus(404);
      res.status(200).send("success");
    } catch (err) {
      res.status(500).json({
        message: err.message,
      });
    }
  },
};
