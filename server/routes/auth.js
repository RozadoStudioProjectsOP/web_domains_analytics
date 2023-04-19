import { Router } from "express";
import passport from "passport";
const router = Router();

import { register, login, logout } from "../controllers/auth.js"

// Auth Routes
router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").post(logout);

// Google OAuth
router.route('/google').get(passport.authenticate('google', { scope: ['profile', 'email'] }));
router.route('/google/callback').get(passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:3001/');
});

export default router;