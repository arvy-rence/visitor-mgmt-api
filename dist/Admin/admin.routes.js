import { createAdmin, getAllAdmin, getAdminByUsername } from "./admin.controller.js";
import express from "express";
const router = express.Router();
/**
 * ROOT URL: /api/admin
 */
router.get('/', getAllAdmin);
router.get('/:username', getAdminByUsername);
router.post('/', createAdmin);
export default router;
