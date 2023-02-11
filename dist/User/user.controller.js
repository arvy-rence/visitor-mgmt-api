var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { UserService } from "./user.service.js";
const userService = new UserService();
export const getAllUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getAllUsers()
    });
});
export const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userService.updateUserInfo(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "User updated",
            data: response
        });
    }
    else {
        res.status(401).json({
            message: "User not updated",
            error: response.error
        });
    }
});
export const upsertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = yield userService.upsertUser(req.body);
    if (response.error === null) {
        res.status(201).json({
            message: "User updated",
            data: response
        });
    }
    else {
        res.status(401).json({
            message: "User not updated",
            error: response.error
        });
    }
});
export const getUserByEmail = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getSingleUser(req.params.email)
    });
});
export const getUserByInfoString = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getSingleUserByInfoString(req.params.qr_code)
    });
});
export const signupUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    res.status(200).json({
        data: yield userService.signUpUser(email, password)
    });
});
export const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = req.body;
    res.status(200).json({
        data: yield userService.loginUser(email, password)
    });
});
export const getGenderCount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getGenderCount()
    });
});
export const getUserCountByBarangay = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getUserCountByBarangay()
    });
});
export const getUserCountByAgeGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.status(200).json({
        data: yield userService.getUserCountByAgeGroup()
    });
});
export const disableUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users } = req.body;
    res.status(200).json({
        data: yield userService.disableUsers(users)
    });
});
export const enableUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { users } = req.body;
    res.status(200).json({
        data: yield userService.enableUsers(users)
    });
});
export const editUserByAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, fullName, birthday } = req.body;
    res.status(204).json({
        data: yield userService.updateUserViaAdmin(id, fullName, birthday)
    });
});
