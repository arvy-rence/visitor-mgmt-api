export class CreateVisitorLogDTO {
    constructor(qr_code: string, location: string) {
        this.qr_code = qr_code;
        this.location = location;
    }
    qr_code: string;
    location: string;
}
