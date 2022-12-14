var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import client from "../client.js";
import { generateNewQR } from "./user.util.js";
export class UserService {
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: users, error } = yield client
                .from("user")
                .select("*");
            if (error === null) {
                return users;
            }
            else {
                return {
                    error: error,
                };
            }
        });
    }
    signUpUser(email, password) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let { data, error } = yield client.auth.signUp({
                email: email,
                password: password
            });
            if (error === null) {
                const response = yield client.from("user").insert([
                    {
                        id: (_a = data === null || data === void 0 ? void 0 : data.user) === null || _a === void 0 ? void 0 : _a.id,
                        email: email,
                    }
                ]);
                return data;
            }
            else {
                return {
                    error: error,
                };
            }
        });
    }
    updateUserInfo(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // remove spaces from full_name
            user.full_name = user.full_name.replace(/\s/g, "");
            const { salt, qr_code } = generateNewQR(user.full_name, user.email);
            try {
                return yield client
                    .from("user")
                    .update({
                    full_name: user.full_name,
                    contact_number: user.contact_number,
                    birthday: user.birthday,
                    is_valenzuela_resident: user.is_valenzuela_resident,
                    barangay: user.barangay,
                    city: user.city,
                    is_active: user.is_active,
                    sex: user.sex,
                    qr_code: qr_code,
                    salt: salt,
                    province: user.province,
                    is_student: user.is_student,
                    school_code: user.school_code
                })
                    .eq("email", user.email);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        });
    }
    getSingleUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: user, error } = yield client
                .from("user")
                .select("*")
                .eq("email", email);
            if (error === null) {
                return user;
            }
            else {
                return {
                    error: error,
                };
            }
        });
    }
    getSingleUserByInfoString(info_string) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: user, error } = yield client
                .from("user")
                .select("*")
                .eq("qr_code", info_string);
            if (error === null) {
                return user;
            }
            else {
                return {
                    error: error,
                };
            }
        });
    }
    loginUser(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: user, error } = yield client.auth.signInWithPassword({ email, password });
            if (error === null) {
                return user;
            }
            else {
                return {
                    error: error,
                };
            }
        });
    }
}
