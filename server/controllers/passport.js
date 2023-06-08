import passport from "passport";
import GoogleStrategy from 'passport-google-oauth20';
import GitHubStrategy from 'passport-github2';
import User from "../models/user.js";

import { CALLBACK_URL } from "../utils/envSetup.js";

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
                    username: profile.username,
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