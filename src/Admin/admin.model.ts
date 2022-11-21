export class CreateAdminDTO {
    constructor() {
        this.username = '';
        this.password = '';
    }
    username: string;
    password: string;
}

export class UpdateAdminDTO extends CreateAdminDTO {}