import { getAllUsers, createUser, getUserByEmail, getUserByInfoString, signupUser } from "./user.controller.js";
import express from "express";
const router = express.Router();
/**
 * ROOT URL: /api/user
 */
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/qr/:qr_code', getUserByInfoString);
router.post('/', createUser);
router.post('/confirm', signupUser);
export default router;
