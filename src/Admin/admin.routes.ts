import {
    createAdmin,
    getAllAdmin,
    getAdminByUsername
} from "./admin.controller.js";
import express, {Router} from "express";

const router: Router = express.Router();

/**
 * ROOT URL: /api/admin
 */

router.get('/', getAllAdmin);
router.get('/:username', getAdminByUsername)

router.post('/', createAdmin);


export default router;