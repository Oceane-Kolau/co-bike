import express from "express";
import passport from 'passport';
require('dotenv').config();

const UserController       = require ('../controller/UserController');
const isAdmin              = require('../config/administrator');
const router               = express.Router();
const CLIENT_HOME_PAGE_URL = `http://${process.env.API_CREDENTIALS}/profile`;


router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/logout', UserController.logout);
router.get('/user', UserController.getUser);
router.get('/allUsers', isAdmin, UserController.getAllUsers);
router.post('/deleteUser', isAdmin, UserController.deleteOneUser);
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] }));
router.get('/auth/google/callback', passport.authenticate('google', 
  { failureRedirect: '/failed', successRedirect: CLIENT_HOME_PAGE_URL }));
router.get('/auth/strava', passport.authenticate('strava'));
router.get('/auth/strava/callback', passport.authenticate('strava', 
  { failureRedirect: '/failed', successRedirect: CLIENT_HOME_PAGE_URL }));

module.exports = router;