export class CreateUserDTO {
    is_student: boolean;
    school_code: string;
    constructor(full_name: string, email: string, contact_number: string, birthday: Date, is_valenzuela_resident: boolean, barangay: string, city: string, province: string, is_active: boolean, sex: boolean, qr_code: string, salt: string, is_student: boolean, school_code: string) {
        this.full_name = full_name;
        this.email = email;
        this.contact_number = contact_number;
        this.birthday = birthday;
        this.is_valenzuela_resident = is_valenzuela_resident;
        this.barangay = barangay;
        this.city = city;
        this.province = province;
        this.is_active = is_active;
        this.sex = sex;
        this.qr_code = qr_code;
        this.salt = salt;
        this.is_student = is_student;
        this.school_code = school_code
    }

    full_name: string
    email: string
    contact_number: string
    birthday: Date
    is_valenzuela_resident: boolean
    barangay: string
    city: string
    province: string
    is_active: boolean
    sex: boolean
    qr_code: string
    salt: string
}

class UpdateUserDTO extends CreateUserDTO {
}