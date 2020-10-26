import express from 'express';
var router = express.Router();
import passport from 'passport'
import passportGoogle from 'passport-google-oauth20'

import dotenv from 'dotenv';
// Setting up environment variables
dotenv.config();

const GoogleStrategy = passportGoogle.Strategy;

passport.serializeUser((user, done) => {
    console.log("serialize user", user)
    done(null, user);
})

passport.deserializeUser((user, done) => {
    console.log("dserialize user", user)
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
}, (accessToken, refreshToken, profile, done) => {

    //try to get user from the database

    //create the user if doesnt exists

    done(null, profile, accessToken );
}))

// Googe Oauth2
router.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email'],
}));

// Google Oauth2 callback url
router.get('/auth/google/callback', passport.authenticate('google'), (req, res, next) => {
    console.log("callback called");
    res.redirect("jobodyssey://jobodyssey.io?id=" + req.user.id);
});

router.get('/logout', (req, res) => {
    if (req.user) {                
        req.logout(); // passport kills the cookie
    }
});

export default router;
