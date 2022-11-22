import {createVisitorLog, getAllVisitorLogs} from "./visitorlog.controller.js";
import express, {Router} from "express";

const router: Router = express.Router()

/**
 * ROOT URL: /api/visitorlog
 */

router.get('/', getAllVisitorLogs);

router.post('/', createVisitorLog);

export default router;
