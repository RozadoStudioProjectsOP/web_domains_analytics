import { Router } from "express";
import passport from "passport";
const router = Router();

import { register, login, logout } from "../controllers/auth.js"
import { BASE_URL } from "../controllers/passport.js"

// Auth Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/user").get((req, res) => {
    res.send(req.user);
});

// Google OAuth
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));
router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect(`${BASE_URL}/`);
});

// Facebook OAuth
router.route('/facebook').get(passport.authenticate('facebook', { scope: ['profile', 'email'] }));
router.route('/facebook/callback').get(passport.authenticate('facebook', { failureRedirect: '/' }), (req, res) => {
    res.redirect(`${BASE_URL}/`);
});
router.route("/user/facebook").get((req, res) => {
    res.status(200);
    res.type("html").send("<h1>Facebook user</h1>");
});

// Github OAuth
router.route('/github').get(passport.authenticate('github', { scope: ['profile', 'email'] }));
router.route('/github/callback').get(passport.authenticate('github', { failureRedirect: '/' }), (req, res) => {
    res.redirect(`${BASE_URL}/`);
});

export default router;