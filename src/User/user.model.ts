export class CreateUserDTO {
    constructor(full_name: string, email: string, contact_number: string, birthday: Date, is_valenzuela_resident: boolean, barangay: string, city: string, is_active: boolean, sex: boolean, qr_code: string, salt: string) {
        this.full_name = full_name;
        this.email = email;
        this.contact_number = contact_number;
        this.birthday = birthday;
        this.is_valenzuela_resident = is_valenzuela_resident;
        this.barangay = barangay;
        this.city = city;
        this.is_active = is_active;
        this.sex = sex;
        this.qr_code = qr_code;
        this.salt = salt;
    }

    full_name: string
    email: string
    contact_number: string
    birthday: Date
    is_valenzuela_resident: boolean
    barangay: string
    city: string
    is_active: boolean
    sex: boolean
    qr_code: string
    salt: string
}

class UpdateUserDTO extends CreateUserDTO {
}