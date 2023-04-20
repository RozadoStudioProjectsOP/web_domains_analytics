import passport from "passport";
import dotenv from "dotenv";
import GoogleStrategy from 'passport-google-oauth20';
import FacebookStrategy from 'passport-facebook';
import GitHubStrategy from 'passport-github2';
import User from "../models/user.js";

dotenv.config();

const CALLBACK_URL = process.env.NODE_ENV === "production" ? process.env.CALLBACK_URL_PROD : process.env.CALLBACK_URL_DEV;

passport.use(
    new GoogleStrategy({
        // options for google strategy
        callbackURL: `${CALLBACK_URL}/auth/google/callback`,
        clientID: `${process.env.GOOGLE_CLIENT_ID}`,
        clientSecret: `${process.env.GOOGLE_CLIENT_SECRET}`,
        scope: ['profile', 'email']
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('google passport callback function fired');
        User.findOne({ accountId: profile.id, provider: profile.provider }).then((currentUser) => {
            if (currentUser !== null) {
                console.log(currentUser)
                done(null, currentUser);
            } else {
                const userData = {
                    accountId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    provider: profile.provider,
                }
                console.log(userData)
                User.create(userData).then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(
    new FacebookStrategy({
        // options for facebook strategy
        clientID: `${process.env.FACEBOOK_CLIENT_ID}`,
        clientSecret: `${process.env.FACEBOOK_CLIENT_SECRET}`,
        callbackURL: `${CALLBACK_URL}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'emails'],
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('facebook passport callback function fired');
        User.findOne({ accountId: profile.id, provider: profile.provider }).then((currentUser) => {
            if (currentUser !== null) {
                console.log(currentUser)
                done(null, currentUser);
            } else {
                const email = profile.emails ? profile.emails[0].value : profile.id + '@facebook.com';
                const userData = {
                    accountId: profile.id,
                    username: profile.displayName,
                    email: email,
                    provider: profile.provider,
                }
                console.log(userData)
                User.create(userData).then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.use(
    new GitHubStrategy({
        // options for github strategy
        clientID: `${process.env.GITHUB_CLIENT_ID}`,
        clientSecret: `${process.env.GITHUB_CLIENT_SECRET}`,
        callbackURL: `${CALLBACK_URL}/auth/github/callback`,
        scope: ['profile', 'user:email'],
    }, (accessToken, refreshToken, profile, done) => {
        // passport callback function
        console.log('github passport callback function fired');
        User.findOne({ accountId: profile.id, provider: profile.provider }).then((currentUser) => {
            if (currentUser !== null) {
                console.log(currentUser)
                done(null, currentUser);
            } else {
                const userData = {
                    accountId: profile.id,
                    username: profile.displayName,
                    email: profile.emails[0].value,
                    provider: profile.provider,
                }
                console.log(userData)
                User.create(userData).then((newUser) => {
                    done(null, newUser);
                });
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user._id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});

export default passport;