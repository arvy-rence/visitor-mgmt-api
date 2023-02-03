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
        // remove spaces from full_name
        user.full_name = user.full_name.replace(/\s/g, "");
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
                        province: user.province,
                        is_student: user.is_student,
                        school_code: user.school_code
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

    async loginUser(email: string, password: string) {
        const {data: user, error} = await client.auth.signInWithPassword({email, password})
        if (error === null) {
            return user;
        } else {
            return {
                error: error,
            };
        }
    }

    async getGenderCount() {
        let genderCount = {
            male: 0,
            female: 0,
            lgbt: 0,
            optout: 0
        }
        const { data: count, error } = await client
            .from("user")
            .select("sex_int")
        if (error === null) {
            count.forEach((user) => {
                if (user.sex_int === 1) {
                    genderCount.male++
                } else if (user.sex_int === 2) {
                    genderCount.female++
                } else if (user.sex_int === 3) {
                    genderCount.lgbt++
                } else {
                    genderCount.optout++
                }
            })
            return genderCount
        } else {
            return {
                error: error
            }
        }
    }

    // get top 5 user count by barangay
    async getUserCountByBarangay() {
        const { data: count, error } = await client
            .from("user_barangay_count")
            .select("barangay, count")
        
        if (error === null) {
            // only return top 5 if count is greater than 5
            count!.sort((a, b) => {
                return b.count - a.count
            })
            if (count!.length > 5) {
                return count!.slice(0, 5)
            }
            return count
        } else {
            return {
                error: error
            }
        }
    }

    // get users by age group
    async getUserCountByAgeGroup() {
        const { data: users, error } = await client
            .from("user")
            .select("birthday")

        if (error === null) {
            const currentDate = new Date()
            // compute age from birthdays
            let ages = users!.map((user) => {
                const birthdate = new Date(user.birthday)
                let age = currentDate.getFullYear() - birthdate.getFullYear()
                if (currentDate.getMonth() < birthdate.getMonth()) 
                    age--
                return age
            })

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
            ]
            return ageGroups
        }
    }
}