import express from 'express';
import passport from 'passport';
import { Strategy as OAuth2Strategy } from 'passport-oauth2';
import User from '../models/User.js';
import dotenv from "dotenv"; // Assuming you have a User model

const router = express.Router();
dotenv.config();

passport.use(new OAuth2Strategy({
    authorizationURL: 'https://provider.com/auth',
    tokenURL: 'https://provider.com/token',
    clientID: process.env.OAUTH2_CLIENT_ID,
    clientSecret: process.env.OAUTH2_CLIENT_SECRET,
    callbackURL: 'http://localhost:3000/auth/provider/callback'
  },
  (accessToken, refreshToken, profile, cb) => {
    User.findOrCreate({ oauthId: profile.id }, (err, user) => {
      return cb(err, user);
    });
  }
));

router.get('/auth/provider', passport.authenticate('oauth2'));

router.get('/auth/provider/callback', 
  passport.authenticate('oauth2', { failureRedirect: '/login' }),
  (req, res) => {
    res.redirect('/'); // Redirect to home page after successful authentication
  });

export { router as oauthRouter };
