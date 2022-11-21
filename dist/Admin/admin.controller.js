var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { AdminService } from "./admin.service.js";
const adminService = new AdminService();
export const getAllAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield adminService.getAllAdmins()
    });
});
export const createAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield adminService.createAdmin(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "Admin created",
        });
    }
    else {
        res.status(401).json({
            message: "Admin not created",
            error: response.error
        });
    }
});
export const getAdminByUsername = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield adminService.getSingleAdmin(req.params.username)
    });
});
