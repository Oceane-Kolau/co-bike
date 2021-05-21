import User from "../model/UserModel";
import { UserInterface, PublicUserInterface } from "../interface/UserInterface";
import express, { NextFunction, Request, Response } from "express";

module.exports = (req: Request, res: Response, next: NextFunction) => {
  try {
    const { user }: any = req;
    if (user) {
      User.findOne({ _id: user.id }, (err: Error, doc: UserInterface) => {
        if (err) throw err;
        if (doc.isAdmin) {
          next();
        } else {
          res.sendStatus(403).send("Sorry, only admin's can perform this.");
        }
      });
    } else {
      res.send("Sorry, you arent logged in.");
    }
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};
