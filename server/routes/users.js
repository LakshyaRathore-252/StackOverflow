import express from "express";

import {   forgotPassword, restPassword, sendOtp, verifyOTP } from "../Controllers/auth.js";
import {  updatePoints  } from "../Controllers/users.js";

import { login, signup } from "../Controllers/auth.js";
import { getAllUsers, updateProfile } from "../Controllers/users.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

router.post("/signup", signup);
router.post("/login", login);
router.post("/forgot-password", forgotPassword);
router.post('/rest-password/:token', restPassword);
router.post('/Otp', sendOtp)
router.post('/otp-verify', verifyOTP);

router.get("/getAllUsers", getAllUsers);
router.patch("/update/:id", auth, updateProfile);
router.get('/update-points/:id', updatePoints);

export default router;
