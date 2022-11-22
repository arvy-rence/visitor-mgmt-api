export class CreateVisitorLogDTO {
    constructor(qr_code: string, time_in: Date, location: string) {
        this.qr_code = qr_code;
        this.time_in = time_in;
        this.location = location;
    }
    qr_code: string;
    time_in: Date;
    location: string;

}
