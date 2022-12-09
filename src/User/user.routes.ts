import {
    getAllUsers,
    createUser,
    getUserByEmail,
    getUserByInfoString,
    signupUser
} from "./user.controller.js";

import express, {Router} from "express";

const router: Router = express.Router();

/**
 * ROOT URL: /api/user
 */

router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/qr/:qr_code', getUserByInfoString);

router.patch('/:email', createUser);
router.post('/confirm', signupUser);

export default router;