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
export class AdminService {
    getAllAdmins() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: admin, error } = yield client
                .from('admin')
                .select('*');
            if (error === null) {
                return admin;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    createAdmin(admin) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client
                    .from('admin')
                    .insert([
                    { username: admin.username, password: admin.password }
                ]);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        });
    }
    getSingleAdmin(username) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: admin, error } = yield client
                .from('admin')
                .select('*')
                .eq('username', username);
            if (error === null) {
                return admin;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
}
