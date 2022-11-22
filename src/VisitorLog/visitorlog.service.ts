import client from '../client.js';
import {CreateVisitorLogDTO} from './visitorlog.model.js';

export class VisitorLogService {
    async getAllVisitorLogs() {
        const {data: visitorLog, error} = await client
            .from('visitor_log')
            .select('*')
        if (error === null) {
            return visitorLog
        } else {
            return {
                error: error
            }
        }
    }

    async createVisitorLog(visitorLog: CreateVisitorLogDTO) {
        try {
            return await client
                .from('visitor_log')
                .insert([
                    {
                        qr_code: visitorLog.qr_code,
                        time_in: visitorLog.time_in,
                        location: visitorLog.location
                    }
                ])
        } catch (e) {
            return {
                error: e
            }
        }
    }
}