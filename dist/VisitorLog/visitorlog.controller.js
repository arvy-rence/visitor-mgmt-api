var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { VisitorLogService } from './visitorlog.service.js';
const visitorLogService = new VisitorLogService();
export const getAllVisitorLogs = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield visitorLogService.getAllVisitorLogs()
    });
});
export const createVisitorLog = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield visitorLogService.createVisitorLog(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "Visitor log created",
        });
    }
    else {
        res.status(401).json({
            message: "Visitor log not created",
            error: response.error
        });
    }
});
export const getVisitorLogsForToday = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield visitorLogService.getVisitorLogsForToday()
    });
});
export const getGenderCountPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield visitorLogService.getGenderCountPerMonth()
    });
});
export const getBarangayCountPerMonth = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield visitorLogService.getBarangayCountPerMonth()
    });
});
