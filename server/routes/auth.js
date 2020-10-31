import express from 'express';
var router = express.Router();
import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'
import graphqlPassport from 'graphql-passport';
const { GraphQLLocalStrategy } = graphqlPassport;
import bcrypt from 'bcryptjs';

import dotenv from 'dotenv';

import { User } from '../sequelize.js';

// Setting up environment variables
dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    console.log("serialize user", user)
    done(null, user.id);
})

passport.deserializeUser(async (id, done) => {
    console.log("dserialize user",id)
    const user = await User.findOne({ where: { id: id } });    
    done(null, user)
})

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_OAUTH_CLIENT_ID,
    clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET, // Add the secret here
    callbackURL: '/auth/google/callback'
}, async (accessToken, refreshToken, profile, done) => {

    // pull from postgress a user that matches the socialID
    let user = await User.findOne({ where: { social_id: profile.id } });
    console.log("matched user: ", user, profile);
    // if exists i return it

    if (!user) {
        user = await User.create({ username: profile.emails[0].value ,social_id: profile.id , email: profile.emails[0].value , password: '' });
    }
    // if not i created it and return it    
    done(null, user, accessToken );
}))

passport.use(
    new GraphQLLocalStrategy(async (email, password, done) => {      
      const user = await User.findOne({
        where: {
            email,
        },
      });
      let isMatch = false;
      if (user) {
        isMatch = await bcrypt.compare(password, user.dataValues.password);
      }      
      console.log("matched user graph auth: ", user);      
      const error = isMatch ? null : new Error('no matching user');
      done(error, user);
    }),
  );


// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    console.log("callback called");
    var sig = req.cookies['express:sess.sig'];
    var session = req.cookies['express:sess']
    res.redirect("jobodyssey://jobodyssey.io?sig=" + sig + "&session=" + session);
});

router.get('/logout', (req, res) => {
    if (req.user) {                
        req.logout(); // passport kills the cookie
    }
});

export default router;
