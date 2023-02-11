import { getAllUsers, createUser, getUserByEmail, getUserByInfoString, signupUser, loginUser, getGenderCount, getUserCountByBarangay, getUserCountByAgeGroup, disableUsers, enableUsers, editUserByAdmin, upsertUser } from "./user.controller.js";
import express from "express";
const router = express.Router();
/**
 * ROOT URL: /api/user
 */
router.get('/', getAllUsers);
router.get('/:email', getUserByEmail);
router.get('/qr/:qr_code', getUserByInfoString);
router.get('/gender/count', getGenderCount);
router.get('/info/barangay', getUserCountByBarangay);
router.get('/info/agegroup', getUserCountByAgeGroup);
router.patch('/:email', createUser);
router.patch('/upsert/:email', upsertUser);
router.patch('/action/disable', disableUsers);
router.patch('/action/enable', enableUsers);
router.patch('/action/edit', editUserByAdmin);
router.post('/confirm', signupUser);
router.post('/', loginUser);
export default router;
