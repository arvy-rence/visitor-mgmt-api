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
                .select("*")
                .order("full_name", { ascending: true });
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
            user.full_name = user.full_name.split('').filter(e => e.trim().length).join('');
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
    getGenderCount() {
        return __awaiter(this, void 0, void 0, function* () {
            let genderCount = {
                male: 0,
                female: 0,
                lgbt: 0,
                optout: 0
            };
            const { data: count, error } = yield client
                .from("user")
                .select("sex_int");
            if (error === null) {
                count.forEach((user) => {
                    if (user.sex_int === 1) {
                        genderCount.male++;
                    }
                    else if (user.sex_int === 2) {
                        genderCount.female++;
                    }
                    else if (user.sex_int === 3) {
                        genderCount.lgbt++;
                    }
                    else {
                        genderCount.optout++;
                    }
                });
                return genderCount;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    // get top 5 user count by barangay
    getUserCountByBarangay() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: count, error } = yield client
                .from("user_barangay_count")
                .select("barangay, count");
            if (error === null) {
                // only return top 5 if count is greater than 5
                count.sort((a, b) => {
                    return b.count - a.count;
                });
                if (count.length > 5) {
                    return count.slice(0, 5);
                }
                return count;
            }
            else {
                return {
                    error: error
                };
            }
        });
    }
    // get users by age group
    getUserCountByAgeGroup() {
        return __awaiter(this, void 0, void 0, function* () {
            const { data: users, error } = yield client
                .from("user")
                .select("birthday");
            if (error === null) {
                const currentDate = new Date();
                // compute age from birthdays
                let ages = users.map((user) => {
                    const birthdate = new Date(user.birthday);
                    let age = currentDate.getFullYear() - birthdate.getFullYear();
                    if (currentDate.getMonth() < birthdate.getMonth())
                        age--;
                    return age;
                });
                const ageGroups = [
                    {
                        id: 'Children (12-14)',
                        label: 'Children',
                        // count 12 - 14 year olds
                        value: ages.filter((age) => age >= 12 && age <= 14).length,
                        color: '#80c993',
                    },
                    {
                        id: 'Early Working Age (15-24)',
                        label: 'Early Working Age (15-24)',
                        value: ages.filter((age) => age >= 15 && age <= 24).length,
                        color: '#019328',
                    },
                    {
                        id: 'Prime Working Age (25-54)',
                        label: 'Prime Working Age (25-54)',
                        value: ages.filter((age) => age >= 25 && age <= 54).length,
                        color: '#8087a4',
                    },
                    {
                        id: 'Mature Working Age (55-64)',
                        label: 'Mature Working Age (55-64)',
                        value: ages.filter((age) => age >= 55 && age <= 64).length,
                        color: '#00104a',
                    },
                    {
                        id: 'Elderly (65 and above)',
                        label: 'Elderly (65 and above)',
                        value: ages.filter((age) => age >= 65).length,
                        color: '#e10909',
                    },
                ];
                return ageGroups;
            }
        });
    }
    disableUsers(users) {
        return __awaiter(this, void 0, void 0, function* () {
            users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                let { error } = yield client
                    .from("user")
                    .update({ is_active: false })
                    .eq("id", user);
                if (error !== null) {
                    return {
                        error: error
                    };
                }
            }));
            return {
                data: "success"
            };
        });
    }
    enableUsers(users) {
        return __awaiter(this, void 0, void 0, function* () {
            users.forEach((user) => __awaiter(this, void 0, void 0, function* () {
                let { error } = yield client
                    .from("user")
                    .update({ is_active: true })
                    .eq("id", user);
                if (error !== null) {
                    return {
                        error: error
                    };
                }
            }));
            return {
                data: "success"
            };
        });
    }
    updateUserViaAdmin(id, fullName, birthday) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                return yield client
                    .from("user")
                    .update({
                    full_name: fullName,
                    birthday: birthday
                })
                    .eq("id", id);
            }
            catch (e) {
                return {
                    error: e
                };
            }
        });
    }
}
