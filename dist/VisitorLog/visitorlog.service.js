var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from '../client.js';
export class VisitorLogService {
    getAllVisitorLogs() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: visitorLog, error } = yield client
                .from('visitor_log')
                .select('*');
            if (error === null) {
                return visitorLog;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    createVisitorLog(visitorLog) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client
                    .from('visitor_log')
                    .insert([
                    {
                        qr_code: visitorLog.qr_code,
                        location: visitorLog.location
                    }
                ]);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        });
    }
}
