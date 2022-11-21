export class CreateUserDTO {
    constructor(full_name, email, contact_number, birthday, is_valenzuela_resident, barangay, city, is_active, sex, qr_code, salt) {
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
}
class UpdateUserDTO extends CreateUserDTO {
}
