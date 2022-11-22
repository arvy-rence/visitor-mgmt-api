import {Request, Response} from 'express';
import {VisitorLogService} from './visitorlog.service.js';
import {CreateVisitorLogDTO} from './visitorlog.model.js';

const visitorLogService: VisitorLogService = new VisitorLogService();

export const getAllVisitorLogs = async (req: Request, res: Response): Promise<any> => {
    res.status(200).json({
        data: await visitorLogService.getAllVisitorLogs()
    });
}

export const createVisitorLog = async (req: Request<{}, {}, CreateVisitorLogDTO>, res: Response): Promise<any> => {
    const response = await visitorLogService.createVisitorLog(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "Visitor log created",
        })
    } else {
        res.status(401).json({
            message: "Visitor log not created",
            error: response.error
        })
    }
}