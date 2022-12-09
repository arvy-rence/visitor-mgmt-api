import client from "../client.js";
import {CreateUserDTO} from "./user.model.js";
import {generateNewQR} from "./user.util.js";

export class UserService {
    async getAllUsers() {
        const { data: users, error } = await client
            .from("user")
            .select("*");
        if (error === null) {
            return users;
        } else {
            return {
                error: error,
            };
        }
    }

    async signUpUser(email: string, password: string) {
        let { data, error } = await client.auth.signUp({
            email: email,
            password: password
        })

        if (error === null) {
            const response = await client.from("user").insert([
                {
                    id: data?.user?.id,
                    email: email,
                }
            ])
            return data;
        } else {
            return {
                error: error,
            };
        }
    }

    async updateUserInfo(user: CreateUserDTO) {
        const {salt, qr_code} = generateNewQR(user.full_name, user.email)

        try {
            return await client
                .from("user")
                .update(
                    {
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
                        province: user.province
                    }
                )
                .eq(
                    "email",
                    user.email
                )
        } catch (e) {
            return {
                error: e
            }
        }
    }

    async getSingleUser(email: string) {
        const { data: user, error } = await client
            .from("user")
            .select("*")
            .eq("email", email);
        if (error === null) {
            return user;
        } else {
            return {
                error: error,
            };
        }
    }

    async getSingleUserByInfoString(info_string: string) {
        const { data: user, error } = await client
            .from("user")
            .select("*")
            .eq("qr_code", info_string);
        if (error === null) {
            return user;
        } else {
            return {
                error: error,
            };
        }
    }
}