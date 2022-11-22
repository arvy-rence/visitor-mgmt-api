import { createVisitorLog, getAllVisitorLogs } from "./visitorlog.controller.js";
import express from "express";
const router = express.Router();
/**
 * ROOT URL: /api/visitorlog
 */
router.get('/', getAllVisitorLogs);
router.post('/', createVisitorLog);
export default router;
