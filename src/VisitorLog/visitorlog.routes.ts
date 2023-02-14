import {createVisitorLog, getAllVisitorLogs, getBarangayCountPerMonth, getGenderCountPerMonth, getVisitorLogsForToday, getVisitorLogsPerLocation} from "./visitorlog.controller.js";
import express, {Router} from "express";

const router: Router = express.Router()

/**
 * ROOT URL: /api/visitorlog
 */

router.get('/', getAllVisitorLogs);
router.get('/today', getVisitorLogsForToday)
router.get('/gender-per-month', getGenderCountPerMonth)
router.get('/barangay-per-month', getBarangayCountPerMonth)

router.post('/log-per-location', getVisitorLogsPerLocation)
router.post('/', createVisitorLog);

export default router;
