import { createVisitorLog, getAllVisitorLogs, getGenderCountPerMonth, getVisitorLogsForToday } from "./visitorlog.controller.js";
import express from "express";
const router = express.Router();
/**
 * ROOT URL: /api/visitorlog
 */
router.get('/', getAllVisitorLogs);
router.get('/today', getVisitorLogsForToday);
router.get('/gender-per-month', getGenderCountPerMonth);
router.post('/', createVisitorLog);
export default router;
